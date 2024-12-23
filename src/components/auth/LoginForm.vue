// src/components/auth/LoginForm.vue
<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-extrabold text-gray-800">Welcome Back</h2>
                <p class="text-gray-500">Please log in to your account</p>
            </div>
            <form @submit.prevent="handleLogin">
                <div class="mb-6">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                    <div class="mt-1">
                        <input 
                            id="email"
                            type="email" 
                            v-model="email" 
                            class="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <div class="mt-1">
                        <input 
                            id="password"
                            type="password" 
                            v-model="password" 
                            class="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                </div>
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center">
                        <input 
                            id="remember-me" 
                            type="checkbox" 
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label for="remember-me" class="ml-2 text-sm text-gray-700">Remember me</label>
                    </div>
                    <a href="#" class="text-sm text-blue-600 hover:text-blue-500">Forgot your password?</a>
                </div>
                <button 
                    type="submit"
                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Login
                </button>
            </form>
            <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                    Don't have an account? 
                    <a href="/register" class="text-blue-600 hover:text-blue-500 font-medium">Sign up</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
    try {
        await auth.login({
            email: email.value,
            password: password.value,
        });
        router.push('/dashboard');
    } catch (error) {
        console.error('Login failed:', error);
    }
};
</script>

<style scoped>
body {
    font-family: 'Inter', sans-serif;
}
</style>
