import { TaskPriorities, TaskStatuses } from "common/enum/enum"
import { UpdateDomainTaskModelType } from "../model/tasksSlice"

export type ArgUpdateTask = {
  todolistId: string
  taskId: string
  domainModel: UpdateDomainTaskModelType
}
export type ArgRemoveTaskType = {
  todolistId: string
  taskId: string
}

export type AddTaskArgType = {
  title: string
  todolistId: string
}
export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModelType = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}
export type GetTaskResponse = {
  totalCount: number
  error: null | string
  items: TaskType[]
} 

