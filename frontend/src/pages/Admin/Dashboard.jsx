import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium mb-2">Welcome, {user?.name}</h3>
                    <p className="text-gray-600">You have admin privileges</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/admin/blogs" className="text-blue-600 hover:underline">
                                Manage Blogs
                            </a>
                        </li>
                        <li>
                            <a href="/admin/users" className="text-blue-600 hover:underline">
                                Manage Users
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;