import React from 'react';
import './App.css';
import TodoList, {taskType} from "./TodoList";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<taskType>
}
function App() {
    // const [tasks, setTasks,] = useState<taskType[]>(
    //     [{id: v1(), title: "HTML, CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "Redux", isDone: false},
    //         {id: v1(), title: "Angular", isDone: false},
    //         {id: v1(), title: "Vue", isDone: false},
    //     ])
    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistID1, title: "What to learn", filter: "active"},
        {id: todolistID2, title: "What to buy", filter: "completed"}
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Watch', isDone: false},
        ]
    })

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        let todolist = todoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodoLists([...todoLists])
        }
    }
    const removeTask = (taskId: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter((task) => task.id !== taskId)
        setTasks({...tasks})
    }


    const addTasks = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks});
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks})
    }

    function removeTodolist(id: string) {
        setTodoLists(todoLists.filter(t => t.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todoLists.map(todolist => {
                    let allTodoListTasks = tasks[todolist.id]
                    let tasksForTodoList = allTodoListTasks

                    if (todolist.filter === "active") {
                        tasksForTodoList = allTodoListTasks.filter(task => !task.isDone)
                    }
                    if (todolist.filter === "completed") {
                        tasksForTodoList = allTodoListTasks.filter(t => t.isDone)
                    }

                    // let allTodoListTasks = tasks[todolist.id]
                    // const getFilteredTasks = (tasks: Array<taskType>, filter: FilterValuesType): Array<taskType> => {
                    //     switch (todolist.filter) {
                    //         case "active":
                    //             return allTodoListTasks.filter(t => !t.isDone)
                    //         case "completed":
                    //             return allTodoListTasks.filter(t => t.isDone)
                    //         default:
                    //             return tasks
                    //     }
                    // }
                    // const filteredTasks: Array<taskType> = getFilteredTasks(tasks[todolist.id], todolist.filter)

                    return <TodoList
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
