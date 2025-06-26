import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getBlog, deleteBlog } from '../../services/blog';
import Button from '../../components/UI/Button';
import { formatDate } from '../../utils/helpers';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism } from 'prism-react-renderer';
import Spinner from '../../components/UI/Spinner';

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

    const CodeBlock = ({ language, value }) => {
        return (
            <pre className="bg-gray-800 rounded-lg p-4 my-4 overflow-x-auto">
                <code className={`language-${language}`}>
                    {value}
                </code>
            </pre>
        );
    };

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

    if (!blog) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog post not found</h1>
                <Button onClick={() => navigate('/blogs')} variant="primary">
                    Back to Blogs
                </Button>
            </div>
        );
    }

    const isAuthor = user && user.id === blog.author._id;
    const isAdmin = user && user.role === 'admin';

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full">
                        {blog.category || 'Uncategorized'}
                    </span>
                    <span className="text-sm text-gray-500">
                        {formatDate(blog.createdAt)}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {blog.title}
                </h1>

                {blog.image && (
                    <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Markdown Content */}
            <div className="prose prose-indigo max-w-none mb-12">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline ? (
                                <CodeBlock
                                    language={match?.[1] || 'javascript'}
                                    value={String(children).replace(/\n$/, '')}
                                />
                            ) : (
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                    {children}
                                </code>
                            );
                        },
                        img({ node, ...props }) {
                            return (
                                <img
                                    {...props}
                                    className="my-6 rounded-lg shadow-md w-full h-auto"
                                    alt={props.alt || ''}
                                />
                            );
                        },
                        p({ node, children, ...props }) {
                            const hasImage = React.Children.toArray(children).some(
                                child => React.isValidElement(child) && child.type === 'img'
                            );

                            return hasImage ? (
                                <div {...props}>{children}</div>
                            ) : (
                                <p {...props}>{children}</p>
                            );
                        },
                        blockquote({ node, ...props }) {
                            return (
                                <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-600 my-6 py-2">
                                    {props.children}
                                </blockquote>
                            );
                        },
                        table({ node, ...props }) {
                            return (
                                <div className="overflow-x-auto my-6">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        {props.children}
                                    </table>
                                </div>
                            );
                        },
                        th({ node, ...props }) {
                            return (
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {props.children}
                                </th>
                            );
                        },
                        td({ node, ...props }) {
                            return (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-t border-gray-200">
                                    {props.children}
                                </td>
                            );
                        }
                    }}
                >
                    {blog.content}
                </ReactMarkdown>
            </div>

            {/* Author and Actions Section */}
            <div className="border-t border-gray-200 pt-8">
                {(isAuthor || isAdmin) && (
                    <div className="flex justify-end space-x-4">
                        <Button
                            variant="outline"
                            onClick={() => navigate(`/blogs/${id}/edit`)}
                            className="px-6 py-2"
                        >
                            Edit Post
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            className="px-6 py-2"
                        >
                            Delete Post
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPost;