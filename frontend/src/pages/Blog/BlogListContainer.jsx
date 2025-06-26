// BlogListContainer.js
import { useState, useEffect } from 'react';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import { useAuth } from '../../context/AuthContext';

const BlogListContainer = ({ fetchFunction, children }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFunction();
                setBlogs(data.blogs || []);
            } catch (err) {
                setError(err.message || 'Failed to load blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchFunction]);

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

    return children(blogs);
};

export default BlogListContainer;