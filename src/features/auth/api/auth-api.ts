import { AxiosResponse } from 'axios'
import { instance } from 'common/api/base-api'
import { BaseResponseType } from 'common/types/types'

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<null, AxiosResponse<BaseResponseType<{ userId?: number }>>, LoginParamsType>(
      'auth/login',
      data,
    )
  },
  me() {
    return instance.get<BaseResponseType<AuthMeType>>('auth/me')
  },
  logout() {
    return instance.delete<BaseResponseType>('auth/login')
  },
}

//types
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string //or boolean
}
export type AuthMeType = {
  id: number
  email: string
  login: string
}
