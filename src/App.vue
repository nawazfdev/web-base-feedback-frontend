// src/App.vue
<template>
    <div class="min-h-screen bg-gray-50">
        <nav v-if="auth.isAuthenticated" class="bg-white shadow-sm">
            <div class="container mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <router-link to="/dashboard" class="text-xl font-bold">
                        Feedback App
                    </router-link>
                    <div class="flex items-center gap-4">
                        <span>{{ auth.currentUser?.name }}</span>
                        <button 
                            @click="handleLogout"
                            class="text-red-500 hover:text-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
    try {
        await auth.logout();
        router.push('/login');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

onMounted(async () => {
    if (auth.token) {
        try {
            await auth.fetchUser();
        } catch (error) {
            console.error('Failed to fetch user:', error);
            auth.token = null;
            localStorage.removeItem('token');
            router.push('/login');
        }
    }
});
</script>