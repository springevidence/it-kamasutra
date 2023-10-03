import React, { useCallback } from 'react'
import CheckboxInput from 'common/components/CheckboxInput/CheckboxInput'
import { IconButton } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import EditableSpan from 'common/components/EditableSpan.stories/EditableSpan'
import { TaskStatuses } from 'common/enum/enum'
import { TaskType } from 'features/TodolistList/todolists-api'

type TaskPropsType = {
  removeTask: (taskId: string, todolistId: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
  task: TaskType
  todolistId: string
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
  console.log('Task')
  const removeTaskHandler = () => props.removeTask(props.task.id, props.todolistId)
  // const changeTaskStatusHandler = (checked: boolean) => {
  //     props.changeTaskStatus(props.task.id, checked, props.todolistId)
  // }
  const changeTaskStatusHandler = (checked: boolean) => {
    props.changeTaskStatus(props.task.id, checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
  }
  const changeTaskTitleHandler = useCallback(
    (updateTitle: string) => props.changeTaskTitle(props.todolistId, props.task.id, updateTitle),
    [props.task.id, props.todolistId, props.changeTaskTitle],
  )
  return (
    <div className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''} key={props.task.id}>
      <CheckboxInput checked={props.task.status === TaskStatuses.Completed} onChange={changeTaskStatusHandler} />
      <EditableSpan oldTitle={props.task.title} onChange={changeTaskTitleHandler} />
      <IconButton aria-label="delete" onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
})
