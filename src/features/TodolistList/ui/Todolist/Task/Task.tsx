import CheckboxInput from 'common/components/CheckboxInput/CheckboxInput'
import { IconButton } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import EditableSpan from 'common/components/EditableSpan.stories/EditableSpan'
import { TaskStatuses } from 'common/enum/enum'
import { TaskType } from 'features/TodolistList/api/taskApi.types'
import { useAppDispatch } from 'common/hooks/UseAppDispatch'
import { tasksThunks } from 'features/TodolistList/model/tasksSlice'
import s from './Task.module.css'

type Props = {
  task: TaskType
}

export const Task = (props: Props) => {

  const dispatch = useAppDispatch()
  
  const removeTaskHandler = () => dispatch(tasksThunks.removeTask({ todolistId: props.task.todoListId, taskId: props.task.id}))
 
  const changeTaskTitleHandler = (updateTitle: string) => {
    dispatch(tasksThunks.updateTask({ todolistId: props.task.todoListId, taskId: props.task.id, domainModel: { title: updateTitle } }))
  }
  
  const changeTaskStatusHandler = (checked: boolean) => {
    dispatch(tasksThunks.updateTask({ todolistId: props.task.todoListId, taskId: props.task.id, domainModel: { status: checked ? TaskStatuses.Completed : TaskStatuses.New } }))
  }

  const isTaskCompleted = TaskStatuses.Completed

  return (
    <div className={props.task.status === isTaskCompleted ? s.isDone : ''} key={props.task.id}>
      <CheckboxInput checked={props.task.status === isTaskCompleted} onChange={changeTaskStatusHandler} />
      <EditableSpan oldTitle={props.task.title} onChange={changeTaskTitleHandler} />
      <IconButton aria-label="delete" onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
}
