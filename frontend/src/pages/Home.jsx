import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecentBlogs from './Blog/RecentBlogs';
import FeaturedBlog from './Blog/FeaturedBlog';

const Home = () => {
    const { user, isAdmin } = useAuth();

    return (
        <>
            <FeaturedBlog />
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Hero Section */}
                {/* Featured post */}

                {/* Recent Post Section */}
                <div className="mb-16">
                    <h3 className="text-4xl text-[#333333] mb-8 pb-2">Our Recent Posts</h3>
                    <RecentBlogs />
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    {user ? (
                        <div className="flex justify-center space-x-6">
                            <Link
                                to="/blogs"
                                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg"
                            >
                                Browse All Blogs
                            </Link>
                            {isAdmin() && (
                                <Link
                                    to="/admin"
                                    className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 text-lg"
                                >
                                    Admin Dashboard
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="flex justify-center space-x-6">
                            <Link
                                to="/login"
                                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-lg"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;