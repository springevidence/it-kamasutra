import React from 'react';
import './App.css';
import TodoList, {taskType} from "./TodoList";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
function App() {
    const title: string = "What to learn"

    const [tasks, setTasks, ] = useState<taskType[]>(
        [{id: v1(), title: "HTML, CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "Angular", isDone: false},
            {id: v1(), title: "Vue", isDone: false},
        ])
    // const tasks = result[0]
    // const setTasks = result[1]
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTasks)
    }

    const getFilteredTasks = (tasks: Array<taskType>, filter: FilterValuesType): Array<taskType> =>
    {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }
    const filteredTasks: Array<taskType> = getFilteredTasks(tasks, filter)
    const addTasks = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks);
    }
    function changeTaskStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                title={title}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTasks={addTasks}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
