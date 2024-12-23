<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-7xl mx-auto px-4">
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <!-- Header -->
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900">Feedback Dashboard</h2>
                        <p class="text-gray-500 mt-1">Manage and track user feedback</p>
                    </div>
                    <button 
                        @click="showCreateForm = true"
                        class="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        Add Feedback
                    </button>
                </div>

                <!-- Create Form -->
                <div v-if="showCreateForm" class="mb-8 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div class="p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Create New Feedback</h3>
                        <form @submit.prevent="handleCreate">
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input 
                                        v-model="newFeedback.title"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter feedback title"
                                        required
                                    >
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea 
                                        v-model="newFeedback.description"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        rows="3"
                                        placeholder="Describe your feedback"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select 
                                        v-model="newFeedback.category"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="" disabled>Select a category</option>
                                        <option value="Bug">Bug</option>
                                        <option value="Feature Request">Feature Request</option>
                                        <option value="General Feedback">General Feedback</option>
                                    </select>
                                </div>
                                <div class="flex justify-end gap-3 pt-4">
                                    <button 
                                        type="button"
                                        @click="showCreateForm = false"
                                        class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Feedback List -->
                <div class="space-y-6">
                    <div 
                        v-for="feedback in feedbackStore.feedbacks" 
                        :key="feedback.id"
                        class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div class="flex justify-between items-start mb-3">
                            <div class="space-y-1">
                                <div class="flex items-center gap-3">
                                    <h3 class="text-lg font-semibold text-gray-900">{{ feedback.title }}</h3>
                                    <span :class="getCategoryBadgeClass(feedback.category)" class="px-2 py-1 rounded-full text-xs font-medium">
                                        {{ feedback.category }}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-500">Submitted by {{ feedback.user?.name || 'Anonymous' }} • {{ formatDate(feedback.createdAt) }}</p>
                            </div>
                            <div class="flex gap-2">
                                <!-- <button 
                                    @click="editFeedback(feedback)"
                                    class="text-gray-600 hover:text-blue-600 p-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                </button> -->
                                <button 
                                    @click="deleteFeedback(feedback.id)"
                                    class="text-gray-600 hover:text-red-600 p-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <p class="text-gray-600 mb-4">{{ feedback.description }}</p>
                        
                        <!-- Comments Section -->
                        <div class="mt-4 pt-4 border-t border-gray-100">
                            <h4 class="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                </svg>
                                Comments ({{ feedback.comments?.length || 0 }})
                            </h4>
                            <div v-if="feedback.comments?.length" class="space-y-3">
                                <div 
                                    v-for="comment in feedback.comments" 
                                    :key="comment.id"
                                    class="bg-gray-50 p-3 rounded-lg"
                                >
                                    <p class="text-gray-600">{{ comment.content }}</p> 
                                    <p class="text-sm text-gray-500 mt-1">{{ formatDate(comment.created_at) }}</p>
                                    <p class="text-gray-600">{{ comment.user?.name ?? 'Unknown User' }}</p>
 
                                </div>
                            </div>
                            <form @submit.prevent="addComment(feedback.id)" class="mt-3">
                                <div class="flex gap-2">
                                    <input 
                                        v-model="newComments[feedback.id]"
                                        placeholder="Add a comment..."
                                        class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    >
                                    <button 
                                        type="submit"
                                        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                        </svg>
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="mt-6 flex items-center justify-between">
                    <p class="text-sm text-gray-600">
                        Showing {{ paginationStart }} - {{ paginationEnd }} of {{ totalItems }}
                    </p>
                    <div class="flex gap-2">
                        <button 
                            @click="prevPage"
                            :disabled="currentPage === 1"
                            class="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button 
                            @click="nextPage"
                            :disabled="isLastPage"
                            class="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFeedbackStore } from '@/store/feedback';

const feedbackStore = useFeedbackStore();
const showCreateForm = ref(false);
const newFeedback = ref({ title: '', description: '', category: '' });
const newComments = ref({});

// Pagination
const currentPage = ref(1);
const itemsPerPage = 5;
const totalItems = computed(() => feedbackStore.feedbacks.length);
const paginationStart = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const paginationEnd = computed(() => Math.min(currentPage.value * itemsPerPage, totalItems.value));
const isLastPage = computed(() => paginationEnd.value >= totalItems.value);

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    if (!isLastPage.value) currentPage.value++;
};

const getCategoryBadgeClass = (category) => {
    switch (category) {
        case 'Bug':
            return 'bg-red-100 text-red-800';
        case 'Feature Request':
            return 'bg-purple-100 text-purple-800';
        case 'General Feedback':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

onMounted(async () => {
    await feedbackStore.fetchFeedbacks();
    // Load comments for each feedback
    for (const feedback of feedbackStore.feedbacks) {
        const comments = await feedbackStore.getFeedbackComments(feedback.id);
        feedback.comments = comments;
    }
});

const handleCreate = async () => {
    try {
        await feedbackStore.createFeedback(newFeedback.value);
        newFeedback.value = { title: '', description: '', category: '' };
        showCreateForm.value = false;
    } catch (error) {
        console.error('Failed to create feedback:', error);
    }
};

const editFeedback = (feedback) => {
    // Implement edit functionality
    console.log('Edit feedback:', feedback);
 
};

const deleteFeedback = async (id) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
        try {
            await feedbackStore.deleteFeedback(id);
        } catch (error) {
            console.error('Failed to delete feedback:', error);
        }
    }
};

const addComment = async (feedbackId) => {
    try {
        await feedbackStore.addComment(feedbackId, newComments.value[feedbackId]);
        // Refresh comments
        const comments = await feedbackStore.getFeedbackComments(feedbackId);
        const feedback = feedbackStore.feedbacks.find(f => f.id === feedbackId);
        if (feedback) {
            feedback.comments = comments;
        }
        newComments.value[feedbackId] = '';
    } catch (error) {
        console.error('Failed to add comment:', error);
    }
};
</script>