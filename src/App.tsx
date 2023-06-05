import React, {useEffect} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList";
import {useState} from "react";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"
// type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
// type TasksStateType = {
//     [key: string]: Array<taskType>
// }
type  ObjectTypeWithTodolistId = ObjectType & {
    todolistId: string
}
type ObjectType = {
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
}

function App() {
    // let todolistID1 = v1()
    // let todolistID2 = v1()
    //
    // const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    //     {id: todolistID1, title: "What to learn", filter: "all"},
    //     {id: todolistID2, title: "What to buy", filter: "all"}
    // ])
    //
    // let [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistID1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //         {id: v1(), title: 'Redux', isDone: false},
    //
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: 'Book', isDone: true},
    //         {id: v1(), title: 'Watch', isDone: false},
    //     ]
    // })
    const data: ObjectType[] = [
        {
            title: "What to learn",
            filter: "all",
            tasks: [{taskId: v1(), title: 'HTML&CSS', isDone: true},
                {taskId: v1(), title: 'JS', isDone: true},
                {taskId: v1(), title: 'ReactJS', isDone: false},
                {taskId: v1(), title: 'Redux', isDone: false}]
        },
        {
            title: "What to buy",
            filter: "all",
            tasks: [{taskId: v1(), title: 'Book', isDone: true},
                {taskId: v1(), title: 'Watch', isDone: false}]
        }
    ]
    const [todo, setTodo] = useState<ObjectTypeWithTodolistId[]>([])
    useEffect(() => {
        setTodo(data.map(el => ({...el, todolistId: v1()})))
    }, [])

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        // setTodoLists(todoLists.map(t => t.id === todolistId ? {...t, filter: filter} : t))
        setTodo(todo.map(t => t.todolistId === todolistId
            ? {...t, filter}
            : t))
    }
    const removeTask = (taskId: string, todolistId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
        setTodo(todo.map(t => t.todolistId === todolistId
            ? {...t, tasks: t.tasks.filter(f => f.taskId !== taskId)}
            : t))
    }
    const addTasks = (title: string, todolistId: string) => {
        let newTask = {taskId: v1(), title: title, isDone: false}
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        setTodo(todo.map(t => t.todolistId === todolistId
            ? {...t, tasks: [newTask, ...t.tasks]}
            : t))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
        setTodo(todo.map(t => t.todolistId === todolistId
            ? {...t, tasks: t.tasks.map(el => el.taskId === taskId ? {...el, isDone} : el)}
            : t
        ))
    }
    const removeTodolist = (todolistId: string) => {
        // setTodoLists(todoLists.filter(t => t.id !== todolistId))
        setTodo(todo.filter(t => t.todolistId !== todolistId))
    }
    const addTodoList = (newTitle: string) => {
        // const todolistId = v1()
        // const newToDo: TodoListType = {id: todolistId, title: newTitle, filter: "all"}
        // setTodoLists([newToDo, ...todoLists])
        // setTasks({...tasks, [todolistId]: []})
    }
    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: updateTitle} : t)})
    }
    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
        // setTodoLists(todoLists.map(t => t.id === todolistId ? {...t, title: updateTitle}: t))
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodoList}/>
            {
                todo.map(t => {
                    let allTodoListTasks = t.tasks
                    let tasksForTodoList = allTodoListTasks

                    if (t.filter === "active") {
                        tasksForTodoList = allTodoListTasks.filter(task => !task.isDone)
                    }
                    if (t.filter === "completed") {
                        tasksForTodoList = allTodoListTasks.filter(t => t.isDone)
                    }

                    return <TodoList
                        key={t.todolistId}
                        id={t.todolistId}
                        title={t.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeTaskStatus={changeTaskStatus}
                        filter={t.filter}
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
