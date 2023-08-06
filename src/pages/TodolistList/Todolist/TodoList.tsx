import React, {FC, useCallback, useEffect} from 'react';
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../components/EditableSpan.stories/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import style from './Todolist.module.css'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {FilterValuesType} from "../todolists-reducer";
import {fetchTasksTC} from "../tasks-reducer";
import {useAppDispatch} from "../../../app/store";
import {Task} from "./Task/Task";


type TodoListPropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (id: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolistTitle: (todolistId: string, updateTitle: string) => void
}

export const TodoList: FC<TodoListPropsType> = React.memo(({
                                                               tasks,
                                                               title,
                                                               removeTask,
                                                               changeFilter,
                                                               addTasks,
                                                               changeTaskStatus,
                                                               filter,
                                                               id,
                                                               removeTodolist,
                                                               changeTaskTitle,
                                                               updateTodolistTitle
                                                           }) => {
    console.log('TodoList')
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [])
    const removeTodolistHandler = () => removeTodolist(id)
    const addTaskHandler = useCallback((title: string) => {
        addTasks(title, id)
    }, [addTasks, id])
    const updateTodolistTitleHandler = useCallback((id: string, updateTitle: string) => {
        updateTodolistTitle(id, updateTitle);
    }, [id, updateTodolistTitle])

    // let tasksForTodolist = tasks
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => !t.isDone);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone);
    // }

    const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id])
    return (
        <div className={style.todolist}>
            <h3>
                <EditableSpan oldTitle={title} onChange={(updateTitle) => updateTodolistTitleHandler(id, updateTitle)}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            <div>
                {tasks.map(task => <Task task={task}
                                         removeTask={removeTask}
                                         changeTaskTitle={changeTaskTitle}
                                         todolistId={id}
                                         key={task.id} changeTaskStatus={changeTaskStatus}/>
                )}
            </div>
            <div className={style.filtredButtons}>
                <Button variant={filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
})

