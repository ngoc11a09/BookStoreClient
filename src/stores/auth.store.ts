import { signIn, signUp } from '@/api/auth.api'
import { ACCESS_TOKEN, USER } from '@/constants/localStorage'
import type { ISignInData, ISignUpData } from '@/interfaces/auth.interface'
import router from '@/router'
import { defineStore } from 'pinia'

export interface IUSER {
  _id: string,
  role: 'admin' | 'user',
  email: string,
  username: string,
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem(USER) || 'null') as IUSER | null,
    returnUrl: null as string | null
  }),

  actions: {
    async signUp(data: ISignUpData) {
      try {
        const { user, accessToken } = await signUp(data)
        console.log(user);

        this.user = user
        localStorage.setItem(USER, JSON.stringify(user))
        localStorage.setItem(ACCESS_TOKEN, accessToken)
        router.push(`/${user._id}`)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    signOut() {
      this.user = null
      localStorage.removeItem(USER)
      localStorage.removeItem(ACCESS_TOKEN)
      router.push('/signin')
    },

    async signIn(data: ISignInData) {
      try {
        const { message, user, accessToken } = await signIn(data)
        this.user = user
        localStorage.setItem(USER, JSON.stringify(user))
        localStorage.setItem(ACCESS_TOKEN, accessToken)
        router.push('/')
        alert(message)
      } catch (error) {
        return Promise.reject(error)
      }
    },
  }
})
