import { AppRootStateType } from 'app/store'

export const selectLoginIsLoggedIn = (state: AppRootStateType) => state.login.isLoggedIn
