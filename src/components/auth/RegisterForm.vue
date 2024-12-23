// src/components/auth/RegisterForm.vue
<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-extrabold text-gray-800">Create an Account</h2>
                <p class="text-gray-500">Join us today and explore the features!</p>
            </div>
            <form @submit.prevent="handleRegister">
                <div class="mb-6">
                    <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                    <div class="mt-1">
                        <input 
                            id="name"
                            type="text" 
                            v-model="name" 
                            class="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                </div>
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
                            placeholder="Enter a secure password"
                            required
                        />
                    </div>
                </div>
                <button 
                    type="submit"
                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Register
                </button>
            </form>
            <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                    Already have an account? 
                    <a href="/login" class="text-blue-600 hover:text-blue-500 font-medium">Log in</a>
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

const name = ref('');
const email = ref('');
const password = ref('');

const handleRegister = async () => {
    try {
        await auth.register({
            name: name.value,
            email: email.value,
            password: password.value,
        });
        router.push('/dashboard');
    } catch (error) {
        console.error('Registration failed:', error);
    }
};
</script>

<style scoped>
body {
    font-family: 'Inter', sans-serif;
}
</style>
