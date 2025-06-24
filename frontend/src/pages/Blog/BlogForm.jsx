import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { useAuth } from '../../context/AuthContext';
import { createBlog, updateBlog } from '../../services/blog';
import Textarea from '../../components/UI/Textarea';

const BlogForm = ({ blog = null }) => {
    const [title, setTitle] = useState(blog?.title || '');
    const [content, setContent] = useState(blog?.content || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const blogData = { title, content };
            const token = localStorage.getItem('token');

            if (blog) {
                await updateBlog(blog._id, blogData, token);
            } else {
                await createBlog(blogData, token);
            }

            navigate(blog ? `/blogs/${blog._id}` : '/blogs');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}

            <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <Textarea
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                required
            />

            <div className="flex justify-end space-x-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    );
};

export default BlogForm;