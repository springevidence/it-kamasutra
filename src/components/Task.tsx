import React, {ChangeEvent, useCallback} from "react";
import CheckboxInput from "./CheckboxInput";
import EditableSpan from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    updateTaskHandler: (taskId: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
    changeTaskStatus: (taskId: string,isDone: boolean, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.taskId, props.todolistId)
    const changeStatusHandler = (checked: boolean) => {
        props.changeTaskStatus(props.task.taskId, checked,props.todolistId)
    }
    const onTitleChangeHandler = useCallback((updateTitle: string) => props.updateTaskHandler(props.task.taskId, updateTitle, props.todolistId), [props.task.taskId, props.todolistId, props.updateTaskHandler])
    return (
        <div className={props.task.isDone ? "is-done" : ""} key={props.task.taskId}>
            <CheckboxInput
                checked={props.task.isDone}
                onChange={changeStatusHandler}
            />
            <EditableSpan oldTitle={props.task.title}
                          callback={onTitleChangeHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})