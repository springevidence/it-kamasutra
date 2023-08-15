import React, {FC, useCallback, useEffect} from 'react';
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../components/EditableSpan.stories/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import style from './Todolist.module.css'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {fetchTasksTC} from "../tasks-reducer";
import {useAppDispatch} from "../../../app/store";
import {Task} from "./Task/Task";


type TodoListPropsType = {
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolistTitle: (todolistId: string, updateTitle: string) => void
    demo?: boolean
    todolist: TodolistDomainType
}

export const TodoList: FC<TodoListPropsType> = React.memo(({demo = false,
    todolist,
                                                               tasks,
                                                               removeTask,
                                                               changeFilter,
                                                               addTasks,
                                                               changeTaskStatus,
                                                               removeTodolist,
                                                               changeTaskTitle,
                                                               updateTodolistTitle,
                                                           }) => {
    console.log('TodoList')


    const dispatch = useAppDispatch()
    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(todolist.id))
    }, [])
    const removeTodolistHandler = () => removeTodolist(todolist.id)
    const addTaskHandler = useCallback((title: string) => {
        addTasks(title, todolist.id)
    }, [addTasks, todolist.id])
    const updateTodolistTitleHandler = useCallback((id: string, updateTitle: string) => {
        updateTodolistTitle(id, updateTitle);
    }, [todolist.id, updateTodolistTitle])

    // let tasksForTodolist = tasks
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => !t.isDone);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone);
    // }

    const onAllClickHandler = useCallback(() => changeFilter('all', todolist.id), [changeFilter, todolist.id])
    const onActiveClickHandler = useCallback(() => changeFilter('active', todolist.id), [changeFilter, todolist.id])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', todolist.id), [changeFilter, todolist.id])
    return (
        <div className={style.todolist}>
            <h3>
                <EditableSpan oldTitle={todolist.title} onChange={(updateTitle) => updateTodolistTitleHandler(todolist.id, updateTitle)}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}
                disabled={todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskHandler} disabled={todolist.entityStatus === 'loading'}/>
            <div>
                {tasks.map(task => <Task task={task}
                                         removeTask={removeTask}
                                         changeTaskTitle={changeTaskTitle}
                                         todolistId={todolist.id}
                                         key={task.id} changeTaskStatus={changeTaskStatus}/>
                )}
            </div>
            <div className={style.filtredButtons}>
                <Button variant={todolist.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={todolist.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={todolist.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
})

