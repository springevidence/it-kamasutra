import React from 'react';
import './App.css';
import TodoList, {taskType} from "./components/TodoList";
import {useState} from "react";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";

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
    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        setTodoLists(todoLists.map(t => t.id === todolistId ? {...t, filter: filter} : t))
    }
    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const addTasks = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }
    function removeTodolist(todolistId: string) {
        setTodoLists(todoLists.filter(t => t.id !== todolistId))
    }
    const addTodoList = (newTitle: string) => {
        const todolistId = v1()
        const newToDo: TodoListType = {id: todolistId, title: newTitle, filter: "all"}
        setTodoLists([newToDo, ...todoLists])
        setTasks({...tasks, [todolistId]: []})
    }
    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: updateTitle} : t)})
    }
    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
        setTodoLists(todoLists.map(t => t.id === todolistId ? {...t, title: updateTitle}: t))
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodoList}/>
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
                        updateTask={updateTask}
                        updateTodolistTitle={updateTodolistTitle}
                    />
                })
            }
        </div>
    );
}

export default App;
