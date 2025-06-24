import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user, isAdmin } = useAuth();
    // console.log(user);
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome to the Blog Platform</h1>
            <p className="text-xl mb-8">Read, write, and share your thoughts with the world</p>
            
            <div className="flex justify-center space-x-4">
                {user ? (
                    <>
                        <Link
                            to="/blogs"
                            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Browse Blogs
                        </Link>
                        {isAdmin() && (
                            <Link
                                to="/admin"
                                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Admin Dashboard
                            </Link>
                        )}
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;