import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../UI/Button';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Determine if we should use light text colors (when over dark backgrounds)
    const shouldUseLightText = isScrolled && !pastHeroSection;

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/30 backdrop-blur-sm' : 'bg-white shadow-md'}`}>
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo - maintains color unless over dark background */}
                    <Link
                        to="/"
                        className={`text-2xl font-bold ${shouldUseLightText ? 'text-white' : 'text-[#7c4ee4]'}`}
                    >
                        Blog Platform
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <>
                                <Link
                                    to="/blogs"
                                    className={`${shouldUseLightText ? 'text-white hover:text-white/90' : 'text-gray-700 hover:text-[#7c4ee4]'}`}
                                >
                                    Blogs
                                </Link>
                                <Link
                                    to="/about"
                                    className={`${shouldUseLightText ? 'text-white hover:text-white/90' : 'text-gray-700 hover:text-[#7c4ee4]'}`}
                                >
                                    About
                                </Link>
                                {isAdmin() && (
                                    <Link
                                        to="/admin"
                                        className={`${shouldUseLightText ? 'text-white hover:text-white/90' : 'text-gray-700 hover:text-[#7c4ee4]'}`}
                                    >
                                        Admin
                                    </Link>
                                )}
                                <Button
                                    onClick={handleLogout}
                                    variant={shouldUseLightText ? "outline-white" : "danger"}
                                    size="sm"
                                    className={shouldUseLightText ? "border-white text-white hover:bg-white/10" : ""}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`${shouldUseLightText ? 'text-white hover:text-white/90' : 'text-gray-700 hover:text-[#7c4ee4]'}`}
                                >
                                    Login
                                </Link>
                                <Link to="/register">
                                    <Button
                                        variant={shouldUseLightText ? "outline-white" : "primary"}
                                        size="sm"
                                        className={shouldUseLightText ? "border-white text-white hover:bg-white/10" : ""}
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Mobile Menu Button - maintains color */}
                    <button
                        className="md:hidden focus:outline-none text-gray-700"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <FaTimes className="h-6 w-6" />
                        ) : (
                            <FaBars className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu - maintains styling */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white py-4 px-2 shadow-lg rounded-lg mt-2">
                        <nav className="flex flex-col space-y-4">
                            {user ? (
                                <>
                                    <Link
                                        to="/blogs"
                                        className="text-gray-700 hover:text-[#7c4ee4] px-3 py-2"
                                        onClick={closeMobileMenu}
                                    >
                                        Blogs
                                    </Link>
                                    <Link
                                        to="/about"
                                        className="text-gray-700 hover:text-[#7c4ee4] px-3 py-2"
                                        onClick={closeMobileMenu}
                                    >
                                        About
                                    </Link>
                                    {isAdmin() && (
                                        <Link
                                            to="/admin"
                                            className="text-gray-700 hover:text-[#7c4ee4] px-3 py-2"
                                            onClick={closeMobileMenu}
                                        >
                                            Admin
                                        </Link>
                                    )}
                                    <Button
                                        onClick={handleLogout}
                                        variant="danger"
                                        size="sm"
                                        className="w-full justify-center"
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-[#7c4ee4] px-3 py-2"
                                        onClick={closeMobileMenu}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="w-full"
                                        onClick={closeMobileMenu}
                                    >
                                        <Button variant="primary" size="sm" className="w-full justify-center">
                                            Register
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;