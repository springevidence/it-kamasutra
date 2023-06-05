import React, {FC, ChangeEvent} from 'react';
import {FilterValuesType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (id: string) => void
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolistTitle: (todolistId: string,updateTitle: string) => void
}
export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}
const TodoList: FC<TodoListPropsType> = ({tasks, title, removeTask, changeFilter, addTasks, changeTaskStatus, filter,id, removeTodolist, updateTask, updateTodolistTitle}) => {
    const taskJSX: Array<JSX.Element> = tasks.map((task) => {
        const onClickHandler = () => removeTask(task.taskId, id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.taskId, e.currentTarget.checked, id)
        return (
            <li className={task.isDone ? "is-done" : ""} key={task.taskId}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <EditableSpan oldTitle={task.title} callback={(updateTitle)=> updateTaskHandler(task.taskId, updateTitle)}/>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    })
    const onAllClickHandler = () => changeFilter('all', id)
    const onActiveClickHandler = () => changeFilter('active', id)
    const onCompletedClickHandler = () => changeFilter('completed', id)
    const removeTodolistHandler = () => removeTodolist(id)
    const addTaskHandler = (title: string) => {
        addTasks(title, id)
    }
    const updateTaskHandler = (tID: string, updateTitle: string) => {
        updateTask(id, tID, updateTitle);
    }
    const updateTodolistTitleHandler = (id: string, updateTitle: string) => {
        updateTodolistTitle(id, updateTitle);
    }
    return (
        <div className="todolist">
            <h3>
                <EditableSpan oldTitle={title} callback={(updateTitle)=> updateTodolistTitleHandler(id, updateTitle)}/>
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            <ul>
                {taskJSX}
            </ul>
            <div>
                <button className={filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;