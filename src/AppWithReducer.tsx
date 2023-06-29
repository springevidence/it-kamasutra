import React, { useReducer} from 'react';
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
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {taskId: v1(), title: 'HTML&CSS', isDone: true},
            {taskId: v1(), title: 'JS', isDone: true},
            {taskId: v1(), title: 'ReactJS', isDone: false},
            {taskId: v1(), title: 'Redux', isDone: false},

        ],
        [todolistID2]: [
            {taskId: v1(), title: 'Book', isDone: true},
            {taskId: v1(), title: 'Watch', isDone: false},
        ]
    })
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatchToTodolist(changeTodolistFilterAC(todolistId, filter))
    }
    const removeTask = (taskId: string, todolistId: string) => {
        dispatchToTasks(removeTaskAC(todolistId, taskId))
    }
    const addTasks = (title: string, todolistId: string) => {
        dispatchToTasks(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }
    const addTodoList = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }
    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, taskId, updateTitle))
    }
    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
        dispatchToTodolist(changeTodolistTitleAC(todolistId,updateTitle))
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

export default AppWithReducers;
