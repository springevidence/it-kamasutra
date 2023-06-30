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
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }
    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(todolistId, taskId)
        dispatch(action)
    }
    const addTasks = (title: string, todolistId: string) => {
        const action = addTaskAC(todolistId, title)
        dispatch(action)
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatch(action)
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }
    const addTodoList = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }
    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        const action = changeTaskTitleAC(todolistId, taskId, updateTitle)
        dispatch(action)

    }
    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
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
