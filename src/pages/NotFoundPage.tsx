import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className="mx-auto max-w-lg">
            <div className="card">
                <h1 className="text-2xl font-bold">404 – Page not found</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    The page you’re looking for doesn’t exist or has moved.
                </p>
                <div className="mt-4">
                    <Link to="/" className="btn btn-solid">
                        ← Go to Menu
                    </Link>
                </div>
            </div>
        </div>
    );
}