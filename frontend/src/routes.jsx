import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import BlogPage from './pages/Blog/BlogPage';
import BlogPost from './pages/Blog/BlogPost';
import AdminDashboard from './pages/Admin/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NotFound from './pages/NotFound';

const PrivateRoute = ({ adminOnly = false }) => {
    const { user, isAdmin } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin()) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:id" element={<BlogPost />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<div>Profile Page</div>} />
            </Route>

            {/* Admin-only routes */}
            <Route element={<PrivateRoute adminOnly />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/blogs" element={<div>Manage Blogs</div>} />
                <Route path="/admin/users" element={<div>Manage Users</div>} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;