import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer'
import { TaskType, todolistsAPI, UpdateTaskModelType } from 'api/todolists-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from 'app/store'
import { setAppErrorAC, setErrorActionType, setAppStatusAC, setStatusActionType } from 'app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from 'utills/error-utills'

let initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: ActionsTaskType) => {
  switch (action.type) {
    case 'REMOVE TASK':
      return { ...state, [action.todoListId]: state[action.todoListId].filter((t) => t.id !== action.taskId) }
    case 'ADD TASK':
      return { ...state, [action.todolistId]: [action.task, ...state[action.todolistId]] }
    case 'SET TASKS':
      return { ...state, [action.todolistId]: action.tasks }
    case 'UPDATE TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, ...action.model } : t,
        ),
      }
    case 'ADD-TODOLIST':
      return { ...state, [action.todolist.id]: [] }
    case 'REMOVE-TODOLIST':
      const stateCopy = { ...state }
      delete stateCopy[action.todolistId]
      return stateCopy
    case 'SET-TODOLISTS': {
      const stateCopy = { ...state }
      action.todolists.forEach((t) => {
        stateCopy[t.id] = []
      })
      return stateCopy
    }
    default:
      return state
  }
}

// action creators
export const removeTaskAC = (todoListId: string, taskId: string) =>
  ({
    type: 'REMOVE TASK',
    taskId: taskId,
    todoListId: todoListId,
  }) as const

export const addTaskAC = (todolistId: string, task: TaskType) => ({ type: 'ADD TASK', task, todolistId }) as const

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({ type: 'SET TASKS', todolistId, tasks }) as const

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
  ({
    type: 'UPDATE TASK',
    todolistId,
    taskId,
    model,
  }) as const

// thunk creators
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsTaskType | setStatusActionType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setTasksAC(todolistId, res.data.items))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTaskTC =
  (todolistId: string, title: string) =>
  (dispatch: Dispatch<ActionsTaskType | setErrorActionType | setStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC(todolistId, res.data.data.item))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsTaskType>) => {
  todolistsAPI
    .deleteTask(todolistId, taskId)
    .then((res) => {
      dispatch(removeTaskAC(todolistId, taskId))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
  return (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find((t) => t.id === taskId)
    if (task) {
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel,
      }
      todolistsAPI
        .updateTask(todolistId, taskId, apiModel)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(updateTaskAC(todolistId, taskId, domainModel))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch)
        })
    }
  }
}

//types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}
export type ActionsTaskType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
export type ThunkDispatch = Dispatch<ActionsTaskType | setStatusActionType | setErrorActionType>
