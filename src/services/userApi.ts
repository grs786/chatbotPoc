import axios from "axios";

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Fetch all posts
export const fetchPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
};