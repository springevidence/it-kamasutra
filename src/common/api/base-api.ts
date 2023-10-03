import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '191cd692-ab27-4d62-b8f0-55a83864ec50',
  },
})
