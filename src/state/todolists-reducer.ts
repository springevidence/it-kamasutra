import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";


let initialState: TodolistDomainType[] = []
export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.todolistId ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.todolistId ? {...t, filter: action.filter} : t)
        case "SET-TODOLISTS":
            return action.todolists.map(t => ({...t, filter: 'all'}))
        default:
            return state
    }
}

// action creators
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)

export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)

export const changeTodolistTitleAC = (todolistId: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const)

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const)

export const setTodolistsAC = (todolists: TodolistType[]) => ({type: "SET-TODOLISTS", todolists} as const)

// thunk creators
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => (
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
)

export const removeTodolistTC = (todolistID: string) => (
    (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTodolist(todolistID)
            .then(res => {
                dispatch(removeTodolistAC(todolistID))
            })
    }
)

export const addTodolistTC = (title: string) => (
    (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.createTodolist(title)
            .then(res =>
                dispatch(addTodolistAC(res.data.data.item)))
    }
)

export const changeTodolistTC = (todolistId: string, title: string) => (
    (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res =>
                dispatch(changeTodolistTitleAC(todolistId, title)))
    }
)

//types
export type FilterValuesType = "all" | "active" | "completed"
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}