import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, logout as authLogout, register as authRegister } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    // You would typically verify the token with your backend here
                    // For now, we'll just parse it (not secure in production!)
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const payload = JSON.parse(window.atob(base64));

                    setUser({
                        id: payload.id,
                        email: payload.email,
                        role: payload.role
                    });
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const { token, user } = await authLogin(email, password);
            localStorage.setItem('token', token);
            setUser(user);
            navigate(user.role === 'admin' ? '/admin' : '/');
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const { token, user } = await authRegister(name, email, password, role);
            localStorage.setItem('token', token);
            setUser(user);
            navigate(user.role === 'admin' ? '/admin' : '/');
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = async () => {
        try {
            await authLogout();
            localStorage.removeItem('token');
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const isAdmin = () => user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);