import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-lg">
                <h1 className="text-9xl font-bold text-custom-blue">404</h1>
                <p className="text-2xl mt-4 mb-8 text-gray-700">Page Not Found</p>
                <Link
                    to="/"
                    className="bg-custom-blue hover:bg-customYellow text-white px-6 py-3 rounded-lg text-lg transition duration-300 ease-in-out"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}
