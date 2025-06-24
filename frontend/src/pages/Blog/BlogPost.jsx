import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getBlog, deleteBlog } from '../../services/blog';
import Button from '../../components/UI/Button';
import { formatDate } from '../../utils/helpers';

const BlogPost = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlog(id);
                setBlog(data.data.blog);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                await deleteBlog(id, localStorage.getItem('token'));
                navigate('/blogs');
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!blog) return <div>Blog post not found</div>;

    const isAuthor = user && user.id === blog.author._id;
    const isAdmin = user && user.role === 'admin';

    return (
        <div className="max-w-3xl mx-auto">
            <article className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
                    <span>By {blog.author.name}</span>
                    <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="prose max-w-none">
                    <p className="whitespace-pre-line">{blog.content}</p>
                </div>
            </article>

            {(isAuthor || isAdmin) && (
                <div className="flex justify-end space-x-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate(`/blogs/${id}/edit`)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </div>
            )}
        </div>
    );
};

export default BlogPost;