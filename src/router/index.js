import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import NoteDetail from '../views/NoteDetail.vue'
import BlogEdit from '../views/NoteEdit.vue'
import NoteEdit from "@/views/NoteEdit";
import Register from "@/views/Register";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/note/add',
    name: 'NoteAdd',
    meta : {
      requireAuth: true
    },
    component: NoteEdit
  },
  {
    path: '/note/:noteId/:noteVersion/edit',
    name: 'NoteEdit',
    meta : {
      requireAuth: true
    },
    components: {
      default: NoteEdit
    }
  },
  {
    path: '/note/:noteId',
    name: 'NoteDetail',
    component: NoteDetail
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
