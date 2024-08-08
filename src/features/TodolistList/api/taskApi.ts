
import { BaseResponseType } from 'common/types/types'
import { instance } from 'common/api/base-api'
import { AddTaskArgType, GetTaskResponse, TaskType, UpdateTaskModelType } from './taskApi.types'

export const taskAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(arg: AddTaskArgType) {
    return instance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, {
      title: arg.title,
    })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
}

