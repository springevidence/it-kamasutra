import { BaseResponseType } from 'common/types/types'
import { instance } from 'common/api/base-api'
import { TodolistType } from './todolistsApi.types'

export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>('todo-lists', {
      title: title,
    })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {
      title: title,
    })
  }
}
