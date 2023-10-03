import { tasksReducers, TasksStateType } from './tasks-reducer'
import { TodolistDomainType, todolistsActions, todolistsReducer, todolistsThunks } from './todolists-reducer'
import { TodolistType } from 'features/TodolistList/todolists-api'

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: TodolistDomainType[] = []

  let todolist: TodolistType = {
    title: 'new todolist',
    id: 'any id',
    addedDate: '',
    order: 0,
  }
  const action = todolistsThunks.addTodolist.fulfilled({ todolist }, 'requestId', { title: todolist.title })

  const endTasksState = tasksReducers(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
