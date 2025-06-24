import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../UI/Button';

const Header = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    Blog Platform
                </Link>

                <nav className="flex items-center space-x-6">
                    <Link to="/blogs" className="hover:text-gray-300">Blogs</Link>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            {isAdmin() && (
                                <Link to="/admin" className="hover:text-gray-300">Admin</Link>
                            )}
                            <Button onClick={handleLogout} variant="outline">Logout</Button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                            <Link to="/register">
                                <Button variant="primary">Register</Button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;