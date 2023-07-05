import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type ActionsTaskType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType
export type RemoveTaskActionType = {
    type:'REMOVE TASK'
    taskId: string,
    todoListId: string
}
export type AddTaskActionType = {
    type:'ADD TASK'
    title: string,
    todoListId: string
}
export type ChangeTaskStatusActionType = {
    type:'CHANGE TASK STATUS'
    todoListId: string,
    taskId: string,
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type:'CHANGE TASK TITLE'
    todoListId: string,
    taskId: string,
    title: string
}
let initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: ActionsTaskType) => {
    switch (action.type) {
        case 'REMOVE TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.taskId !== action.taskId)}
        case 'ADD TASK':
            return {...state, [action.todoListId]: [{taskId: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]}
        case "CHANGE TASK STATUS":
            return {...state, [action.todoListId]: state[action.todoListId].map(t => t.taskId === action.taskId ? {...t, isDone: action.isDone} : t)}
        case "CHANGE TASK TITLE":
            return {...state, [action.todoListId]: state[action.todoListId].map(t => t.taskId === action.taskId ? {...t, title: action.title} :t)}
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state
    }
}
export const removeTaskAC = (todoListId: string, taskId: string):RemoveTaskActionType => {
    return {
        type:'REMOVE TASK',
        taskId: taskId,
        todoListId: todoListId
    } as const
}
export const addTaskAC = (todoListId: string, title: string):AddTaskActionType => {
    return {
        type:'ADD TASK',
        title: title,
        todoListId: todoListId
    }
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean):ChangeTaskStatusActionType => {
    return {
        type:'CHANGE TASK STATUS',
        todoListId: todoListId,
        taskId: taskId,
        isDone: isDone
    }
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string):ChangeTaskTitleActionType => {
    return {
        type:'CHANGE TASK TITLE',
        todoListId: todoListId,
        taskId: taskId,
        title: title
    }
}
