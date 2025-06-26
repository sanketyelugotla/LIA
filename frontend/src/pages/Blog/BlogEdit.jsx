import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlog } from '../../services/blog';
import BlogForm from './BlogForm';
import Spinner from '../../components/UI/Spinner';

const BlogEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlog(id);
                setBlog(data.blog);
            } catch (err) {
                setError(err.message);
                navigate('/blogs', { replace: true });
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p className="font-medium">{error}</p>
                    <button
                        onClick={() => navigate('/blogs')}
                        className="mt-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium"
                    >
                        Back to Blogs
                    </button>
                </div>
            </div>
        );
    }

    if (!blog) {
        return null; // or redirect to 404
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Blog Post</h1>
            <BlogForm blog={blog} />
        </div>
    );
};

export default BlogEdit;