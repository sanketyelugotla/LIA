import { useAuth } from '../../context/AuthContext';

const Alert = () => {
    const { alert } = useAuth();

    if (!alert) return null;

    const alertClasses = {
        error: 'bg-red-100 border-red-400 text-red-700',
        success: 'bg-green-100 border-green-400 text-green-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700',
        warning: 'bg-yellow-100 border-yellow-400 text-yellow-700'
    };

    return (
        <div className={`fixed top-4 right-4 border-l-4 p-4 rounded shadow-lg ${alertClasses[alert.type] || alertClasses.info}`}>
            <p className="font-medium">{alert.message}</p>
        </div>
    );
};

export default Alert;