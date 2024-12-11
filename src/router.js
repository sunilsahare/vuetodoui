
import { createRouter, createWebHistory } from 'vue-router'
import TodoListView from './views/TodoListView.vue'
import TodoAddView from './views/TodoAddView.vue'
import TodoEditView from './views/TodoEditView.vue'
import LoginView from './views/LoginView.vue'
import SignupView from './views/SignupView.vue'
import AuthLayout from './layout/AuthLayout.vue'
import HomeLayout from './layout/HomeLayout.vue'

import { useUserStore } from './stores/userStore';

function isLoggedIn() {
    const userStore = useUserStore()
    return userStore.isAuthenticated
}

const routes = [
    {
        path: "/login",
        component: AuthLayout,
        children: [{ path: "", component: LoginView }],
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next({ path: "/" });
            } else {
                next();
            }
        }
    },
    {
        path: "/signup",
        component: AuthLayout,
        children: [{ path: "", component: SignupView }],
    },
    {
        path: "/",
        component: HomeLayout,
        children:
            [{
                path: '/',
                name: 'TodoList',
                component: TodoListView,
                meta: { requiresAuth: true }
            },
            {
                path: '/add',
                name: 'TodoAdd',
                component: TodoAddView,
                meta: { requiresAuth: true }
            },
            {
                path: '/edit/:id',
                name: 'TodoEdit',
                component: TodoEditView,
                props: true,
            }],
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/'
    },
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn()) {
        next({ path: "/login" });
    } else {
        next();
    }
});

export default router