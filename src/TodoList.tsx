import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: taskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTasks: (title: string) => void
}
export type taskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList: FC<TodoListPropsType> = ({tasks, title, removeTask, changeFilter, addTasks}) => {
    const taskJSX: Array<JSX.Element> = tasks.map((task) => {
        const onClickHandler = () => removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    })
    let [inputTitle, setInputTitle] = useState('')
    const addTask = () => {
        addTasks(inputTitle)
        setInputTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
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
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {taskJSX}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;