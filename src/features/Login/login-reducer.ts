import { handleServerAppError, handleServerNetworkError } from 'common/utills/error-utills'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { appActions } from 'app/app-reducer'
import { todolistsActions } from 'features/TodolistList/todolists-reducer'
import { authAPI, LoginParamsType } from 'features/Login/login-api'

// const initialState: InitialStateType = {
//   isLoggedIn: false,
// }

const slice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const loginReducer = slice.reducer
export const loginActions = slice.actions

//thunk creator
export const loginTC =
  (data: LoginParamsType): AppThunk =>
  (dispatch) => {
    // dispatch(setAppStatusAC('loading'))
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          // dispatch(setIsLoggedInAC(true))
          dispatch(loginActions.setIsLoggedIn({ isLoggedIn: true }))
          // dispatch(setAppStatusAC('succeeded'))
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const initializedAppTC = (): AppThunk => (dispatch) => {
  // dispatch(setAppStatusAC('loading'))
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        // dispatch(setIsLoggedInAC(true))
        dispatch(loginActions.setIsLoggedIn({ isLoggedIn: true }))
        // dispatch(setAppStatusAC('succeeded'))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      // dispatch(setAppInitializedAC(true))
      dispatch(appActions.setAppInitialized({ isInitialized: true }))
    })
}
export const logoutTC = (): AppThunk => (dispatch) => {
  // dispatch(setAppStatusAC('loading'))
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(loginActions.setIsLoggedIn({ isLoggedIn: false }))
        // dispatch(setIsLoggedInAC(false))
        // dispatch(setAppStatusAC('succeeded'))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        dispatch(todolistsActions.clearTodosData({}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

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

// action creators
// export const setIsLoggedInAC = (value: boolean) =>
//   ({
//     type: 'login/SET-IS-LOGGED-IN',
//     value,
//   }) as const
