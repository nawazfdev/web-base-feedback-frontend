// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/auth/LoginForm.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/components/auth/RegisterForm.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/components/feedback/FeedbackList.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/',
        redirect: '/dashboard'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation guards
router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    
    // Check if the route requires authentication
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next('/login');
    }
    // Check if the route requires guest access (login/register pages)
    else if (to.meta.requiresGuest && auth.isAuthenticated) {
        next('/dashboard');
    }
    else {
        next();
    }
});

export default router;