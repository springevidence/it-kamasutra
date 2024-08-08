import { tasksReducers } from 'features/TodolistList/model/tasksSlice'
import { todolistsReducer } from 'features/TodolistList/model/todolistsSlice'
import { appReducer } from './appSlice'

import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from 'features/auth/model/loginSlice'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
// const rootReducer = combineReducers({
//   tasks: tasksReducer,
//   todoLists: todolistsReducer,
//   app: appReducer,
//   login: loginReducer,
// })
// непосредственно создаём store
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

// with using redux toolkit
export const store = configureStore({
  reducer: {
    tasks: tasksReducers,
    todoLists: todolistsReducer,
    app: appReducer,
    login: loginReducer,
  },
})
// определить автоматически тип всего объекта состояния
// export type AppRootStateType = ReturnType<typeof rootReducer> // было до redux toolkit
export type AppRootStateType = ReturnType<typeof store.getState>

// типизация для thunk
// export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppDispatchType = typeof store.dispatch

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
