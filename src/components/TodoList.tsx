import React, {FC, ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import {Task} from "./Task";


type TodoListPropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (id: string) => void
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolistTitle: (todolistId: string, updateTitle: string) => void
}
export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
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
                                                               updateTask,
                                                               updateTodolistTitle
                                                           }) => {
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.taskId, e.currentTarget.checked, id)
    console.log('TodoList')

    const changeStatusHandler = (tId: string, checked: boolean) => {
        changeTaskStatus(tId, checked, id)
    }
    const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id])
    const removeTodolistHandler = () => removeTodolist(id)
    const addTaskHandler = useCallback((title: string) => {
        addTasks(title, id)
    }, [addTasks, id])
    const updateTaskHandler = useCallback((tID: string, updateTitle: string) => {
        updateTask(id, tID, updateTitle);
    }, [id, updateTask])
    const updateTodolistTitleHandler = useCallback((id: string, updateTitle: string) => {
        updateTodolistTitle(id, updateTitle);
    }, [id, updateTodolistTitle])

    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }
    return (
        <div className="todolist">
            <h3>
                <EditableSpan oldTitle={title} callback={(updateTitle) => updateTodolistTitleHandler(id, updateTitle)}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            <div>
                {tasks.map(task => <Task task={task}
                                         removeTask={removeTask}
                                         updateTaskHandler={updateTask}
                                         todolistId={id}
                                         key={task.taskId}
                                         changeTaskStatus={changeTaskStatus}/>
                )}
            </div>
            <div>
                <Button variant={filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
})

//type ButtonWithMemoPropsType = {
//     title: string
//     color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
//     variant: 'text' | 'outlined' | 'contained'
//     onClick: () => void
// }
//
// const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
//     return <Button variant={props.variant}
//             onClick={props.onClick}
//             color={props.color}>{props.title}
//     </Button>
// })