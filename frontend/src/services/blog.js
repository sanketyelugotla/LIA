import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/blogs',
    withCredentials: true,
});

// Fetch all blogs
export const getBlogs = async () => {
    const response = await API.get('/');
    return response.data;
};

export const getRecentBlogs = async () => {
    const response = await API.get('/recent');
    return response.data;
};

export const getFeaturedBlog = async () => {
    const response = await API.get('/featured');
    return response.data;
};

// Fetch single blog by ID
export const getBlog = async (id) => {
    const response = await API.get(`/${id}`);
    return response.data;
};

// Create a new blog (requires login)
export const createBlog = async (blogData) => {
    const response = await API.post('/', blogData);
    return response.data;
};

// Update a blog by ID (requires login)
export const updateBlog = async (id, blogData) => {
    const response = await API.patch(`/${id}`, blogData);
    return response.data;
};

// Delete a blog by ID (requires login)
export const deleteBlog = async (id) => {
    const response = await API.delete(`/${id}`);
    return response.data;
};
