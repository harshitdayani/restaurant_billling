import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                Oops! The page you’re looking for doesn’t exist.
            </p>
            <Link to="/" className="btn btn-outline mt-4">
                Go Home
            </Link>
        </div>
    );
}