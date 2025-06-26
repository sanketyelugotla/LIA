import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BlogList from './BlogList';

const BlogPage = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-semibold mb-4">Our blogs</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Find our all blogs from here. Our blogs are written from very research and well known writers
                    so that we can provide you the best blogs and articles for you.
                </p>
            </div>

            {user && (
                <div className="flex justify-end mb-8">
                    <Link
                        to="/blogs/new"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Create New Post
                    </Link>
                </div>
            )}

            <BlogList />
        </div>
    );
};

export default BlogPage;