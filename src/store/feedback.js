// src/store/feedback.js
import { defineStore } from 'pinia';
import api from '@/api/axios';

export const useFeedbackStore = defineStore('feedback', {
    state: () => ({
        feedbacks: [],
        currentFeedback: null,
    }),

    actions: {
        async fetchFeedbacks() {
            try {
                const response = await api.get('/feedback');
                this.feedbacks = response.data;
                return response;
            } catch (error) {
                throw error;
            }
        },

        async createFeedback(feedbackData) {
            try {
                const response = await api.post('/feedback', feedbackData);
                this.feedbacks.push(response.data);
                return response;
            } catch (error) {
                throw error;
            }
        },

        async updateFeedback(id, feedbackData) {
            try {
                const response = await api.put(`/feedback/${id}`, feedbackData);
                const index = this.feedbacks.findIndex(f => f.id === id);
                if (index !== -1) {
                    this.feedbacks[index] = response.data;
                }
                return response;
            } catch (error) {
                throw error;
            }
        },

        async deleteFeedback(id) {
            try {
                await api.delete(`/feedback/${id}`);
                this.feedbacks = this.feedbacks.filter(f => f.id !== id);
            } catch (error) {
                throw error;
            }
        },

        async addComment(feedbackId, comment) {
            try {
                const response = await api.post(`/feedback/${feedbackId}/comments`, { content: comment });
                return response;
            } catch (error) {
                throw error;
            }
        },

        async getFeedbackComments(feedbackId) {
            try {
                const response = await api.get(`/feedback/${feedbackId}/comments`);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    }
});