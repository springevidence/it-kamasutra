import {
    setAppInitializedAC,
    setAppInitializedActionType,
    setAppStatusAC,
    setErrorActionType,
    setStatusActionType
} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utills/error-utills";
import {Dispatch} from "redux";

const initialState:  InitialStateType= {
    isLoggedIn: false
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType  => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return {...state}
    }
}

// action creators
export const setIsLoggedInAC = (value: boolean) => ({
    type: 'login/SET-IS-LOGGED-IN',
    value
} as const)

//thunk creator
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | setStatusActionType | setErrorActionType>) => {

    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC( true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const initializedAppTC = () => (dispatch: Dispatch<ActionsType>) => {

    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppInitializedAC(true))
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType | setStatusActionType | setErrorActionType>) => {

    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC( false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

//types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | setStatusActionType | setErrorActionType | setAppInitializedActionType
type InitialStateType = {
    isLoggedIn: boolean
}