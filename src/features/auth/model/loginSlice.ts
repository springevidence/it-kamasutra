import { handleServerNetworkError } from 'common/utills/handle-server-network-error'
import { createSlice } from '@reduxjs/toolkit'
import { appActions } from 'app/appSlice'
import { todolistsActions } from 'features/TodolistList/todolistsSlice'

import { createAppAsyncThunk } from 'common/utills/createAppAsyncThunk'

import { handleServerAppError } from 'common/utills/handle-server-app-error'
import { LoginParamsType, authAPI } from '../api/auth-api'
import { ResultCode } from 'features/TodolistList/todolists-api'

const slice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(initializedApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

//thunk creator

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('login/login', async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    const res = await authAPI.login(arg)
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      return { isLoggedIn: true }
    } else {
      // ❗ Если у нас fieldsErrors есть значит мы будем отображать эти ошибки
      // в конкретном поле в компоненте (пункт 7)
      // ❗ Если у нас fieldsErrors нету значит отобразим ошибку глобально
      const isShowAppError = !res.data.fieldsErrors.length
      handleServerAppError(res.data, dispatch, isShowAppError)
      return rejectWithValue(res.data)
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('login/logout', async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(todolistsActions.clearTodosData({}))
      return { isLoggedIn: false }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

const initializedApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  'login/initializedApp',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const res = await authAPI.me()
      if (res.data.resultCode === ResultCode.Success) {
        return { isLoggedIn: true }
      } else {
        handleServerAppError(res.data, dispatch, false)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(appActions.setAppInitialized({ isInitialized: true }))
    }
  },
)
export const loginReducer = slice.reducer
// export const loginActions = slice.actions
export const loginThunks = { login, logout, initializedApp }

//types
// type ActionsType =
//   | ReturnType<typeof setIsLoggedInAC>
//   | setStatusActionType
//   | setErrorActionType
//   | setAppInitializedActionType
// type InitialStateType = {
//   isLoggedIn: boolean
// }
//
// export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     case 'login/SET-IS-LOGGED-IN':
//       return { ...state, isLoggedIn: action.value }
//     default:
//       return { ...state }
//   }
// }
//
// action creators
// export const setIsLoggedInAC = (value: boolean) =>
//   ({
//     type: 'login/SET-IS-LOGGED-IN',
//     value,
//   }) as const
//
//export const loginTC =
//   (data: LoginParamsType): AppThunk =>
//   (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: 'loading' }))
//     authAPI
//       .login(data)
//       .then((res) => {
//         if (res.data.resultCode === 0) {
//           // dispatch(setIsLoggedInAC(true))
//           dispatch(loginActions.setIsLoggedIn({ isLoggedIn: true }))
//           // dispatch(setAppStatusAC('succeeded'))
//           dispatch(appActions.setAppStatus({ status: 'succeeded' }))
//         } else {
//           handleServerAppError(res.data, dispatch)
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(error, dispatch)
//       })
//   }
//
//export const logoutTC = (): AppThunk => (dispatch) => {
//   // dispatch(setAppStatusAC('loading'))
//   dispatch(appActions.setAppStatus({ status: 'loading' }))
//   authAPI
//     .logout()
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(loginActions.setIsLoggedIn({ isLoggedIn: false }))
//         // dispatch(setIsLoggedInAC(false))
//         // dispatch(setAppStatusAC('succeeded'))
//         dispatch(appActions.setAppStatus({ status: 'succeeded' }))
//         dispatch(todolistsActions.clearTodosData({}))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// const initialState: InitialStateType = {
//   isLoggedIn: false,
// }
