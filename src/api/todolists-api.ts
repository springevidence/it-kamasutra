import axios, { AxiosResponse } from 'axios'

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '191cd692-ab27-4d62-b8f0-55a83864ec50',
  },
}
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings,
})

//api
export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {
      title: title,
    })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title: title,
    })
  },

  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, taskTitle: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title: taskTitle })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
}

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<
      null,
      AxiosResponse<
        ResponseType<{
          userId?: number
        }>
      >,
      LoginParamsType
    >('auth/login', data)
  },
  me() {
    return instance.get<ResponseType<AuthMeType>>('auth/me')
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  },
}

//types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Later = 4,
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
export type GetTaskResponse = {
  totalCount: number
  error: null | string
  items: TaskType[]
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string //or boolean
}
export type AuthMeType = {
  id: number
  email: string
  login: string
}
