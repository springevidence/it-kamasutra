import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: taskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTasks: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}
export type taskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList: FC<TodoListPropsType> = ({tasks, title, removeTask, changeFilter, addTasks, changeTaskStatus, filter}) => {
    const taskJSX: Array<JSX.Element> = tasks.map((task) => {
        const onClickHandler = () => removeTask(task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
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
            addTasks(inputTitle)
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
    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')
    return (
        <div className="todolist">
            <h3>{title}</h3>
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