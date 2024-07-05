import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'a3c2f99e-1c1c-4818-b9ab-09de58523ab7',
  },
})
