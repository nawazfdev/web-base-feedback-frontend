// src/store/auth.js
import { defineStore } from 'pinia';
import api from '@/api/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),
    
    actions: {
        async register(userData) {
            try {
                const response = await api.post('/auth/register', userData);
                this.token = response.data.token;
                this.user = response.data.user;
                localStorage.setItem('token', this.token);
                return response;
            } catch (error) {
                throw error;
            }
        },

        async login(credentials) {
            try {
                const response = await api.post('/auth/login', credentials);
                this.token = response.data.token;
                this.user = response.data.user;
                localStorage.setItem('token', this.token);
                return response;
            } catch (error) {
                throw error;
            }
        },

        async logout() {
            try {
                await api.post('/auth/logout');
                this.token = null;
                this.user = null;
                localStorage.removeItem('token');
            } catch (error) {
                throw error;
            }
        },

        async fetchUser() {
            try {
                const response = await api.get('/user');
                this.user = response.data;
                return response;
            } catch (error) {
                throw error;
            }
        }
    },

    getters: {
        isAuthenticated: (state) => !!state.token,
        currentUser: (state) => state.user,
    }
});