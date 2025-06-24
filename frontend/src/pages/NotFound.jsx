import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <div className="max-w-md">
                <h1 className="text-9xl font-bold text-gray-400 mb-4">404</h1>
                <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex justify-center">
                    <Link to="/">
                        <Button variant="primary">
                            Go to Homepage
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;