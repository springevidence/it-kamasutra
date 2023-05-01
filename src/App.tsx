import React from 'react';
import './App.css';
import TodoList, {taskType} from "./TodoList";
import {useState} from "react";

export type FilterValuesType = "all" | "active" | "completed"
function App() {
    const title: string = "What to learn"

    const [tasks, setTasks, ] = useState<taskType[]>(
        [{id: 1, title: "HTML, CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "React", isDone: false},
            {id: 4, title: "Redux", isDone: false},
        ])
    // const tasks = result[0]
    // const setTasks = result[1]
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskId: number) => {
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

    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                title={title}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
