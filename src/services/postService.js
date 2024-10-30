import api from '../api';

// Fetches all posts from the API
export const getPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error; 
    }
};

// Creates a new post with given data
export const createPost = async (data) => {
    try {
        const response = await api.post('/posts', data);
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

// Updates an existing post by ID
export const updatePost = async (id, data) => {
    try {
        const response = await api.put(`/posts/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};

// Deletes a post by ID
export const deletePost = async (id) => {
    try {
        const response = await api.delete(`/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};
