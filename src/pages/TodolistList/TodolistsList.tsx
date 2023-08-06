import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/TodoList";
import {TasksStateType} from "../../app/App";

export const TodolistsList: React.FC = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId))
    }, [])

    const addTasks = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {status: status}))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [])

    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodolistTC(newTitle))
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, updateTitle: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title: updateTitle}))
    }, [])

    const updateTodolistTitle = useCallback((todolistId: string, updateTitle: string) => {
        dispatch(changeTodolistTC(todolistId, updateTitle))
    }, [])

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm callback={addTodoList}/>
            </Grid>
            <Grid container spacing={5}>
                {
                    todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id]
                        if (tl.filter === "active") {
                            tasksForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.New);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed);
                        }
                        return <Grid key={tl.id} item>
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
                                    changeTaskTitle={changeTaskTitle}
                                    updateTodolistTitle={updateTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }

            </Grid>
        </>)
}