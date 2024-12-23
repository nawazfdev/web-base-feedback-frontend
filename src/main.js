// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store'; // Import Pinia
import './style.css'; 

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
