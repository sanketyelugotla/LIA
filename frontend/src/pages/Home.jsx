// Home.js
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecentBlogs from './Blog/RecentBlogs';
import FeaturedBlog from './Blog/FeaturedBlog';
import PopularBlogs from './Blog/PopularBlogs';
import SectionTitle from '../components/UI/SectionTile';

const Home = () => {
    const { user, isAdmin } = useAuth();

    return (
        <>
            <FeaturedBlog />
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Recent Post Section */}
                <div className="mb-16">
                    <SectionTitle>Our Recent Posts</SectionTitle>
                    <RecentBlogs />
                </div>

                <div className="mb-16">
                    <SectionTitle>Popular Posts</SectionTitle>
                    <PopularBlogs />
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