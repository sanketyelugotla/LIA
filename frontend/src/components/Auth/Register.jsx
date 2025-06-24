import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Select from '../UI/Select';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const result = await register(name, email, password, role);
        setLoading(false);

        if (result.success) {
            navigate('/');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Select
                    label="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    options={[
                        { value: 'user', label: 'User' },
                        { value: 'admin', label: 'Admin' }
                    ]}
                />
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Registering...' : 'Register'}
                </Button>
            </form>
            <div className="mt-4 text-center">
                <p>
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;