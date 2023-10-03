import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// const initialState: InitialStateType = {
//   status: 'idle',
//   error: null,
//   isInitialized: false,
// }

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions

export type AppInitialState = ReturnType<typeof slice.getInitialState>

// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     case 'APP/SET-STATUS':
//       return { ...state, status: action.status }
//     case 'APP/SET-ERROR':
//       return { ...state, error: action.error }
//     case 'APP/SET-INITIALIZED':
//       return { ...state, isInitialized: action.isInitialized }
//     default:
//       return { ...state }
//   }
// }

// action creators
// export const setAppErrorAC = (error: string | null) =>
//   ({
//     type: 'APP/SET-ERROR',
//     error,
//   }) as const
// export const setAppStatusAC = (status: RequestStatusType) =>
//   ({
//     type: 'APP/SET-STATUS',
//     status,
//   }) as const
// export const setAppInitializedAC = (isInitialized: boolean) =>
//   ({
//     type: 'APP/SET-INITIALIZED',
//     isInitialized,
//   }) as const

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// export type InitialStateType = {
//   //происходит ли сейчас взаимодействие с сервером
//   status: RequestStatusType
//   // если глобальная ошибка произойдет, мы напишем текст ошибки сюда
//   error: string | null
//   //true когда приложение проинизиализировалось
//   isInitialized: boolean
// }
