import { useEffect, useState } from 'react';
import { getBlogs } from '../../services/blog';
import BlogCard from './BlogCard';
import Spinner from '../UI/Spinner';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogs();
                setBlogs(data.data.blogs);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
    );
};

export default BlogList;