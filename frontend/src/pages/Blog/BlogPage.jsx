import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BlogList from './BlogList';

const BlogPage = () => {
    const { user } = useAuth();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">All Blog Posts</h2>
                {user && (
                    <Link
                        to="/blogs/new"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Create New Post
                    </Link>
                )}
            </div>
            <BlogList />
        </div>
    );
};

export default BlogPage;