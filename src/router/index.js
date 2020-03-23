import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import LogIn from '../views/LogIn'
import ProjectManagement from '../views/ProjectManagement'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/project-management',
    name: 'ProjectManagement',
    component: ProjectManagement
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
