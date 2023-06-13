import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    id: string
    type: 'REMOVE-TODOLIST'
}
type AddTodolistActionType ={
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodolistTitleActionType ={
    type: 'CHANGE-TODOLIST-TITLE'
    id: string,
    title: string
}

type ChangeTodolistFilterActionType ={
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodoListType[], action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t=> t.id === action.id ? {...t, title: action.title} :t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} :t)
        default:
            throw new Error('I don\'t understand this type')
    }
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
