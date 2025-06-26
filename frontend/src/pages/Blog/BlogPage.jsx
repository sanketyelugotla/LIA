import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BlogList from './BlogList';
import FeaturedBlog from './FeaturedBlog';

const BlogPage = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Discover Our Latest Articles
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Explore insightful articles written by our team of expert writers.
                    We cover a wide range of topics to provide you with valuable knowledge and perspectives.
                </p>
            </div>

            <FeaturedBlog />

            {/* Action Bar */}
            {user && (
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-gray-800">All Blog Posts</h2>
                    <Link
                        to="/blogs/new"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Create New Post
                    </Link>
                </div>
            )}

            {/* Blog List */}
            <div className="mb-12">
                <BlogList />
            </div>

            {/* Call to Action */}
            {!user && (
                <div className="text-center mt-12 border-t border-gray-200 pt-12">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Want to contribute your own articles?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/login"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="px-6 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors duration-300"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogPage;