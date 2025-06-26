import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { useAuth } from './context/AuthContext';
import AdminDashboard from './pages/Admin/Dashboard';
import BlogForm from './pages/Blog/BlogForm';
import BlogPage from './pages/Blog/BlogPage';
import BlogPost from './pages/Blog/BlogPost';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import BlogEdit from './pages/Blog/BlogEdit';

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
            <Route path="/blogs/new" element={<BlogForm />} />
            <Route path="/blogs/:id" element={<BlogPost />} />
            <Route path="/blogs/:id/edit" element={<BlogEdit />} />

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