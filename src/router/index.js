import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Blogs from '../views/Blogs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'
import CreatePost from '../views/CreatePost.vue'
import BlogPreview from '../views/BlogPreview.vue'
import Ckeditor from '../components/Ckeditor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: Blogs,
      meta: {
        title: 'Blogs'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: 'Register'
      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        title: 'Forgot Password'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        title: 'Profile'
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        title: 'Admin'
      }
    },
    {
      path: '/create-post',
      name: 'CreatePost',
      component: CreatePost,
      meta: {
        title: 'Create Post'
      }
    },
    {
      path: '/post-preview',
      name: 'PostPreview',
      component: BlogPreview,
      meta: {
        title: 'Post Preview'
      },
    },
    {
      path: '/ck',
      name: 'ck',
      component: Ckeditor,
      meta: {
        title: 'Post Preview'
      },
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Fireblog`
  next()
})

export default router
