import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: taskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (id: string) => void
}
export type taskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList: FC<TodoListPropsType> = ({tasks, title, removeTask, changeFilter, addTasks, changeTaskStatus, filter,id, removeTodolist}) => {
    const taskJSX: Array<JSX.Element> = tasks.map((task) => {
        const onClickHandler = () => removeTask(task.id, id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, id)
        return (
            <li className={task.isDone ? "is-done" : ""} key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <span>{task.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    })
    let [inputTitle, setInputTitle] = useState('')
    let [error, setError] = useState<string | null>(null);
    const addTask = () => {
        if (inputTitle.trim() !== "") {
            addTasks(inputTitle, id)
            setInputTitle('')
        } else {
            setError("Field is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === "Enter") {
            addTask()
        }
    }
    const onAllClickHandler = () => changeFilter('all', id)
    const onActiveClickHandler = () => changeFilter('active', id)
    const onCompletedClickHandler = () => changeFilter('completed', id)
    const removeTodolistHandler = () => removeTodolist(id)

    return (
        <div className="todolist">
            <h3>{title} <button onClick={removeTodolistHandler}>x</button></h3>
            <div>
                <input value={inputTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className= {error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
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