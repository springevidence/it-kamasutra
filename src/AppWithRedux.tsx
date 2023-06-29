import React, {useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    addTaskAC,
    changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";
import {
    ActionsType,
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)

       // [ {id: todolistID1, title: "What to learn", filter: "all"},
       //  {id: todolistID2, title: "What to buy", filter: "all"}]

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()
    //     {[todolistID1]: [
    //         {taskId: v1(), title: 'HTML&CSS', isDone: true},
    //         {taskId: v1(), title: 'JS', isDone: true},
    //         {taskId: v1(), title: 'ReactJS', isDone: false},
    //         {taskId: v1(), title: 'Redux', isDone: false},
    //
    //     ],
    //     [todolistID2]: [
    //         {taskId: v1(), title: 'Book', isDone: true},
    //         {taskId: v1(), title: 'Watch', isDone: false},
    //     ]
    // }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        // setTodoLists(todoLists.map(t => t.id === todolistId ? {...t, filter: filter} : t))
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)
    }
    const removeTask = (taskId: string, todolistId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.taskId !== taskId)})
        const action = removeTaskAC(todolistId, taskId)
        dispatch(action)
    }
    const addTasks = (title: string, todolistId: string) => {
        // let newTask = {taskId: v1(), title: title, isDone: false}
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        const action = addTaskAC(todolistId, title)
        dispatch(action)
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.taskId === taskId ? {...t, isDone: isDone} : t)})
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatch(action)
    }
    const removeTodolist = (todolistId: string) => {
        // setTodoLists(todoLists.filter(t => t.id !== todolistId))
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }
    const addTodoList = (newTitle: string) => {
        // const todolistId = v1()
        // const newToDo: TodoListType = {id: todolistId, title: newTitle, filter: "all"}
        // setTodoLists([newToDo, ...todoLists])
        // setTasks({...tasks, [todolistId]: []})
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }
    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.taskId === taskId ? {...t, title: updateTitle} : t)})
        const action = changeTaskTitleAC(todolistId, taskId, updateTitle)
        dispatch(action)

    }
    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
        // setTodoLists(todoLists.map(t => t.id === todolistId ? {...t, title: updateTitle}: t))
        const action = changeTodolistTitleAC(todolistId,updateTitle)
        dispatch(action)
    }

    return (
        <div className="App">
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callback={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoLists.map(tl => {
                        let tasksForTodolist = tasks[tl.id]
                        if (tl.filter === "active") {
                            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                        }

                    // {/*    todo.map(t => {*/}
                    // {/*        let allTodoListTasks = t.tasks*/}
                    // {/*        let tasksForTodoList = allTodoListTasks*/}
                    //
                    // {/*        if (t.filter === "active") {*/}
                    // {/*            tasksForTodoList = allTodoListTasks.filter(task => !task.isDone)*/}
                    // {/*        }*/}
                    // {/*        if (t.filter === "completed") {*/}
                    // {/*            tasksForTodoList = allTodoListTasks.filter(t => t.isDone)*/}
                    // {/*        }*/}

                            return <Grid item>
                                <Paper elevation={3} style={{padding: "10px"}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTasks={addTasks}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
