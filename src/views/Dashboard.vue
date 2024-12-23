<template>
    <div class="dashboard">
      <h2>Welcome to your Dashboard</h2>
      <p v-if="!feedbacks.length">You have no feedback yet.</p>
      <ul>
        <li v-for="feedback in feedbacks" :key="feedback.id">
          {{ feedback.title }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    data() {
      return {
        feedbacks: [],
      };
    },
    async created() {
      try {
        const response = await api.get('/feedback');
        this.feedbacks = response.data;
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles for the dashboard page here */
  </style>
  