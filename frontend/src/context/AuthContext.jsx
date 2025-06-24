import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, logout as authLogout, register as authRegister, verifyToken } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await verifyToken();
                if (response.status === 200) {
                    setUser(response.data.user);
                }
            } catch (err) {
                console.error('Auth check failed:', err);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const showAlert = (message, type = 'error') => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 5000);
    };

    const login = async (email, password) => {
        try {
            const res = await authLogin(email, password);
            setUser(res.data.user);
            navigate(res.data.user.role === 'admin' ? '/admin' : '/');
            return { success: true };
        } catch (err) {
            showAlert(err.response?.data?.message || 'Login failed');
            return { success: false };
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const res = await authRegister(name, email, password, role);
            setUser(res.data.user);
            navigate(res.data.user.role === 'admin' ? '/admin' : '/');
            return { success: true };
        } catch (err) {
            showAlert(err.response?.data?.message || 'Registration failed');
            return { success: false };
        }
    };

    const logout = async () => {
        try {
            await authLogout();
            setUser(null);
            navigate('/login');
        } catch (err) {
            showAlert('Logout failed. Please try again.');
        }
    };

    const isAdmin = () => user?.role === 'admin';

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                alert,
                login,
                logout,
                register,
                isAdmin,
                showAlert
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
