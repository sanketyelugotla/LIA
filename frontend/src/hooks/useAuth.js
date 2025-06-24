import { useAuth } from '../context/AuthContext';

const useAuth = () => {
    const auth = useAuth();

    if (!auth) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return auth;
};

export default useAuth;