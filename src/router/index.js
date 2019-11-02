import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from "firebase";

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/auth/login.vue'),
        meta: {
            guest: true,
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/auth/register.vue'),
        meta: {
            guest: true,
        }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    // let currentUser = localStorage.getItem('user');
    let currentUser = firebase.auth().currentUser;
    let requireAuth = to.matched.some(record => record.meta.requireAuth)
    let guest = to.matched.some(record => record.meta.guest)

    if (requireAuth) {
        if (!currentUser) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else if (guest) {
        if (currentUser) router.push('/')
        else next()
    } else next()
})

export default router