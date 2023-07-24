import React, {useCallback} from 'react';
import style from './App.module.css';
import {TodoList, TaskType} from "./components/Todolist/TodoList";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, Paper, Toolbar} from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
    addTaskAC,
    changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC
} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
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
    console.log('AppWithRedux')
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [])
    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [])
    const addTasks = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [])
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [])
    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, updateTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, updateTitle))
    }, [])
    const updateTodolistTitle = useCallback((todolistId: string, updateTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId,updateTitle))
    },[])

    return (
        <div className={style.app}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color={"inherit"}>
                    <Toolbar>
                        <IconButton
                            size={"large"}
                            edge={"start"}
                            color={"inherit"}
                            aria-label={"menu"}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant={"h6"} component={"div"} sx={{ flexGrow: 1 }}>
                            Your Board
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callback={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoLists.map(tl => {
                        let tasksForTodolist = tasks[tl.id]
                        // let tasksForTodolist = tasks
                        if (tl.filter === "active") {
                            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
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
            </Container>
        </div>
    );
}

export default AppWithRedux;
