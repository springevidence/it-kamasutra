import { todolistsAPI, TodolistType } from 'api/todolists-api'
import { Dispatch } from 'redux'
import { RequestStatusType, setAppStatusAC, setErrorActionType, setStatusActionType } from 'app/app-reducer'
import { handleServerNetworkError } from 'utills/error-utills'

let initialState: TodolistDomainType[] = []
export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter((t) => t.id !== action.todolistId)
    case 'ADD-TODOLIST':
      return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map((t) => (t.id === action.todolistId ? { ...t, title: action.title } : t))
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((t) => (t.id === action.todolistId ? { ...t, filter: action.filter } : t))
    case 'SET-TODOLISTS':
      return action.todolists.map((t) => ({ ...t, filter: 'all', entityStatus: 'idle' }))
    case 'CHANGE-TODOLIST-ENTITY-STATUS':
      return state.map((t) => (t.id === action.todolistId ? { ...t, entityStatus: action.status } : t))
    default:
      return state
  }
}

// action creators
export const removeTodolistAC = (todolistId: string) =>
  ({
    type: 'REMOVE-TODOLIST',
    todolistId,
  }) as const

export const addTodolistAC = (todolist: TodolistType) =>
  ({
    type: 'ADD-TODOLIST',
    todolist,
  }) as const

export const changeTodolistTitleAC = (todolistId: string, title: string) =>
  ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    title,
  }) as const

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) =>
  ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter,
  }) as const

export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({
    type: 'SET-TODOLISTS',
    todolists,
  }) as const

export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) =>
  ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    todolistId,
    status,
  }) as const

// thunk creators
export const fetchTodolistsTC = () => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const removeTodolistTC = (todolistID: string) => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTodolistEntityStatusAC(todolistID, 'loading'))
  todolistsAPI.deleteTodolist(todolistID).then((res) => {
    dispatch(removeTodolistAC(todolistID))
    dispatch(setAppStatusAC('succeeded'))
  })
}

export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI.createTodolist(title).then((res) => {
    dispatch(addTodolistAC(res.data.data.item))
    dispatch(setAppStatusAC('succeeded'))
  })
}

export const changeTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.updateTodolist(todolistId, title).then((res) => dispatch(changeTodolistTitleAC(todolistId, title)))
}

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistsActionType
  | ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
export type ThunkDispatch = Dispatch<ActionsType | setStatusActionType | setErrorActionType>
