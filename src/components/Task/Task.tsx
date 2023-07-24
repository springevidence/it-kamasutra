import React, {useCallback} from "react";
import CheckboxInput from "../CheckboxInput/CheckboxInput";
import EditableSpan from "../EditableSpan.stories/EditableSpan";
import {IconButton} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import {TaskType} from "../Todolist/TodoList";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string ) => void
    task: TaskType
    todolistId: string
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task')
    const removeTaskHandler = () => props.removeTask(props.task.taskId, props.todolistId)
    const changeTaskStatusHandler = (checked: boolean) => {
        props.changeTaskStatus(props.task.taskId, checked, props.todolistId)
    }
    const changeTaskTitleHandler = useCallback((updateTitle: string) => props.changeTaskTitle(props.todolistId, props.task.taskId, updateTitle), [props.task.taskId, props.todolistId, props.changeTaskTitle])
    return (
        <div className={props.task.isDone ? "is-done" : ""} key={props.task.taskId}>
            <CheckboxInput
                checked={props.task.isDone}
                onChange={changeTaskStatusHandler}
            />
            <EditableSpan oldTitle={props.task.title}
                          onChange={changeTaskTitleHandler}/>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})