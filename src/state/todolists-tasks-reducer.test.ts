import {TasksStateType} from "../app/App";
import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TodolistType} from "../api/todolists-api";

// test('ids should be equals', () => {
//     const startTasksState: TasksStateType = {}
//     const startTodolistsState: Array<TodolistDomainType> = []
//
//     const action = addTodolistAC('new todolist')
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todolistsReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState)
//     const idFromTasks = keys[0]
//     const idFromTodolists = endTodolistsState[0].id
//
//     expect(idFromTasks).toBe(action.todolistId)
//     expect(idFromTodolists).toBe(action.todolistId)
// })
