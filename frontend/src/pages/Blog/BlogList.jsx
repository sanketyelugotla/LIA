import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../../services/blog';
import BlogCard from './BlogCard';
import Spinner from '../UI/Spinner';
import Button from '../UI/Button';
import { useAuth } from '../../context/AuthContext';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await getBlogs();
                setBlogs(data.blogs);
            } catch (err) {
                setError(err.message || 'Failed to load blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                <p>{error}</p>
                <Button
                    onClick={() => window.location.reload()}
                    className="mt-2"
                    variant="outline"
                >
                    Retry
                </Button>
            </div>
        );
    }

    if (blogs.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No blogs found</h3>
                {user && (
                    <Link
                        to="/blogs/new"
                        className="text-blue-600 hover:underline"
                    >
                        Create your first blog post
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {user && (
                <div className="flex justify-end">
                    <Link
                        to="/blogs/new"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        New Blog Post
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default BlogList;