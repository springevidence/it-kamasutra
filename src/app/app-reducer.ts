import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../pages/Login/login-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utills/error-utills";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}

// action creators
export const setAppErrorAC = (error: string | null) => ({
    type: 'APP/SET-ERROR',
    error
} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
} as const)
export const setAppInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-INITIALIZED',
    isInitialized
} as const)

//thunk creator
// export const initializedAppTC = () => (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatusAC('loading'))
//     authAPI.me()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC(true))
//                 dispatch(setAppStatusAC('succeeded'))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

//types
export type setErrorActionType = ReturnType<typeof setAppErrorAC>
export type setStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedActionType = ReturnType<typeof setAppInitializedAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если глобальная ошибка произойдет, мы напишем текст ошибки сюда
    error: string | null
    //true когда приложение проинизиализировалось
    isInitialized: boolean
}
type ActionsType = setErrorActionType | setStatusActionType | setAppInitializedActionType | ReturnType<typeof setIsLoggedInAC>