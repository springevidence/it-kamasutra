import React, {FC} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: taskType[]
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void
}
export type taskType = {
    id: number
    title: string
    isDone: boolean
}
const TodoList: FC<TodoListPropsType> = ({tasks, title, removeTask, changeFilter}) => {
    const taskJSX: Array<JSX.Element> = tasks.map((task) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => removeTask(task.id)}>x</button>
            </li>
        )
    })
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskJSX}
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;