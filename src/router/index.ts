import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
import InFoUser from '@/views/auth/InFoUser.vue'
import BookView from '../views/BookView.vue'
import AddBorrow from '../views/AddBorrow.vue'
import BorrowView from '@/views/BorrowView.vue'
import { useAuthStore } from '@/stores/auth.store'
import NotFoundView from '@/views/NotFoundView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'
import LayoutView from '@/views/LayoutView.vue'
import SignInView from '@/views/auth/SignInView.vue'
import UserView from '@/views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView
    },
    {
      path: '/',
      name: 'layout',
      component: LayoutView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/books',
          name: 'book',
          component: BookView
        },
        {
          path: '/borrows',
          name: 'borrow',
          component: BorrowView
        },
        {
          path: '/borrows/add/:id',
          name: 'borrow:add',
          component: AddBorrow
        },
        {
          path: '/users/:id',
          name: 'user',
          component: UserView
        },
      ]
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/:id',
      name: 'info',
      component: InFoUser
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    }
  ]
})
router.beforeEach(async (to, from, next: Function) => {
  const auth = useAuthStore()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.user) {
      next({ name: 'signin' })
    } else next()
  } else {
    next()
  }
})

export default router
