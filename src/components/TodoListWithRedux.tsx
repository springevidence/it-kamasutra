import React, {FC, ChangeEvent} from 'react';
import {FilterValuesType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Checkbox from "./CheckboxInput";
import CheckboxInput from "./CheckboxInput";
import {TodoListType} from "../AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolists-reducer";


type TodoListPropsType = {
    todolist: TodoListType
}
export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = ({
                                             todolist
                                         }) => {
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.taskId, e.currentTarget.checked, id)
    let {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
let dispatch = useDispatch()
    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    const changeStatusHandler = (tId: string, checked: boolean) => {
        const action = changeTaskStatusAC(id, tId, checked)
        dispatch(action)
    }
    const taskJSX: Array<JSX.Element> = tasks.map((task) => {
        const onClickHandler = () => dispatch(removeTaskAC(id, task.taskId))
        return (
            <div className={task.isDone ? "is-done" : ""} key={task.taskId}>
                <CheckboxInput
                    checked={task.isDone} callback={(checked) => changeStatusHandler(task.taskId, checked)}
                />
                <EditableSpan oldTitle={task.title}
                              callback={(updateTitle) => updateTaskHandler(task.taskId, updateTitle)}/>
                <IconButton aria-label="delete" onClick={onClickHandler}>
                    <Delete/>
                </IconButton>
            </div>
        )
    })
    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(id, 'all'))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(id, 'active'))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(id, 'completed'))
    const removeTodolistHandler = () => {
        const action = removeTodolistAC(id)
        dispatch(action)
    }
    const addTaskHandler = (title: string) => {
        const action = addTaskAC(id, title)
        dispatch(action)
    }
    const updateTaskHandler = (tID: string, updateTitle: string) => {
        const action = changeTaskTitleAC(id, tID, updateTitle)
        dispatch(action)
    }
    const updateTodolistTitleHandler = (id: string, updateTitle: string) => {
        const action = changeTodolistTitleAC(id,updateTitle)
        dispatch(action)
    }
    return (
        <div className="todolist">
            <h3>
                <EditableSpan oldTitle={title} callback={(updateTitle) => updateTodolistTitleHandler(id, updateTitle)}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={removeTodolistHandler}>x</button>*/}
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            <div>
                {taskJSX}
            </div>
            <div>
                <Button variant={filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
};

export default TodoList;