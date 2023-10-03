import { AxiosResponse } from 'axios'
import { instance } from 'common/api/base-api'
import { ResponseType } from 'common/types/types'

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<
      null,
      AxiosResponse<
        ResponseType<{
          userId?: number
        }>
      >,
      LoginParamsType
    >('auth/login', data)
  },
  me() {
    return instance.get<ResponseType<AuthMeType>>('auth/me')
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
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
