import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createBlog, updateBlog } from '../../services/blog';

const BlogForm = ({ blog = null }) => {
    const [formData, setFormData] = useState({
        title: blog?.title || '',
        description: blog?.description || '',
        content: blog?.content || '',
        image: blog?.image || '',
        category: blog?.category || 'General',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const categories = [
        'Technology',
        'Gaming',
        'Travel',
        'Design',
        'Education',
        'Arts',
        'Music',
        'Business',
        'Food',
        'General'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const blogData = {
                title: formData.title,
                description: formData.description,
                content: formData.content,
                image: formData.image,
                category: formData.category,
                author: user.id
            };

            if (blog) {
                await updateBlog(blog._id, blogData, token);
            } else {
                await createBlog(blogData, token);
            }

            navigate(blog ? `/blogs/${blog._id}` : '/blogs');
        } catch (err) {
            setError(err.message || 'Failed to save blog post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    {error}
                </div>
            )}

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Featured Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Short Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    required
                    placeholder="A brief summary of your blog post (shown in listings)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Content (Markdown supported)</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={12}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {loading ? 'Saving...' : blog ? 'Update Post' : 'Publish Post'}
                </button>
            </div>
        </form>
    );
};

export default BlogForm;