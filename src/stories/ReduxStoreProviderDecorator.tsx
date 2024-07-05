import React from 'react'
import { Provider } from 'react-redux'
import { AppRootStateType } from '../app/store'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { tasksReducers } from '../features/TodolistList/tasksSlice'
import { todolistsReducer } from '../features/TodolistList/todolistsSlice'
import { v1 } from 'uuid'
import { appReducer } from '../app/appSlice'
import thunkMiddleware from 'redux-thunk'
import { TaskPriorities, TaskStatuses } from 'common/enum/enum'

const rootReducer = combineReducers({
  tasks: tasksReducers,
  todoLists: todolistsReducer,
  app: appReducer,
})

const initialGlobalState: AppRootStateType = {
  todoLists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 },
    { id: 'todolistId2', title: 'What to buy', filter: 'all', entityStatus: 'loading', addedDate: '', order: 0 },
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: '',
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: '',
      },
    ],
    ['todolistId2']: [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: '',
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: '',
      },
    ],
  },
  app: {
    error: null,
    status: 'idle',
    isInitialized: false,
  },
  login: {
    isLoggedIn: false,
  },
}

export const storyBookStore = legacy_createStore(
  rootReducer,
  initialGlobalState as AppRootStateType,
  applyMiddleware(thunkMiddleware),
)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
