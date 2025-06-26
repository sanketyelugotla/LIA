import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecentBlogs } from '../../services/blog';
import BlogCard from './BlogCard';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import { useAuth } from '../../context/AuthContext';

const RecentBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getRecentBlogs();
                setBlogs(data.blogs || []);
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
            <div className="flex justify-center items-center min-h-[200px]">
                <Spinner size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p>{error}</p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="mt-2"
                        variant="outline"
                    >
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    if (blogs.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-12 text-center">
                <h3 className="text-xl font-medium mb-4">No blogs found</h3>
                {user && (
                    <Link
                        to="/blogs/new"
                        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Create your first blog post
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog._id} className="flex">
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentBlogs;