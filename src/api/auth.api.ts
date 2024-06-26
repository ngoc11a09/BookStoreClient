import type { ISignInData, ISignUpData } from '@/interfaces/auth.interface'
import api from './api.interceptor'

export interface ISignInRes {
  message: string
  user: {
    _id: string
    role: 'admin' | 'user'
    username: string
    email: string
  }
  accessToken: string
}

export const signIn = async (data: ISignInData) => {
  try {
    return (await api.post('/api/signin', data)) as ISignInRes
  } catch (error) {
    return Promise.reject(error)
  }
}

export interface ISignUpRes {
  message: string
  user: {
    _id: string
    username: string
    email: string
    role: 'admin' | 'user'
  }
  accessToken: string
}

export const signUp = async (data: ISignUpData) => {
  try {
    return (await api.post('/api/signup', data)) as ISignUpRes
  } catch (error) {
    return Promise.reject(error)
  }
}
