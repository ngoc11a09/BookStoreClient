import { signIn } from '@/api/auth.api'
import { ACCESS_TOKEN, USER } from '@/constants/localStorage'
import type { ISignInData } from '@/interfaces/auth.interface'
import router from '@/router'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem(USER) || 'null'),
    returnUrl: null as string | null
  }),

  actions: {
    async signIn(data: ISignInData) {
      try {
        const { message, user, accessToken } = await signIn(data)
        this.user = user
        localStorage.setItem(USER, JSON.stringify(user))
        localStorage.setItem(ACCESS_TOKEN, accessToken)

        router.push(this.returnUrl || '/')
        return message
      } catch (error) {
        return Promise.reject(error)
      }
    },

    signOut() {
      this.user = null
      localStorage.removeItem(USER)
      router.push('/signin')
    }
  }
})
