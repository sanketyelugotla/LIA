import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import BlogPage from './pages/Blog/BlogPage';
import Dashboard from './pages/Admin/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NotFound from './pages/NotFound';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, isAdmin } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && !isAdmin()) {
        return <Navigate to="/" />;
    }

    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/blogs" element={
                <PrivateRoute>
                    <BlogPage />
                </PrivateRoute>
            } />

            <Route path="/admin" element={
                <PrivateRoute adminOnly>
                    <Dashboard />
                </PrivateRoute>
            } />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;