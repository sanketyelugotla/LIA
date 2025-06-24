import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getBlogs = async () => {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
};

const getBlog = async (id) => {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data;
};

const createBlog = async (blogData, token) => {
    const response = await axios.post(`${API_URL}/blogs`, blogData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const updateBlog = async (id, blogData, token) => {
    const response = await axios.patch(`${API_URL}/blogs/${id}`, blogData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const deleteBlog = async (id, token) => {
    const response = await axios.delete(`${API_URL}/blogs/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };