import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css'
import EndPoint from './Endpoint';
const Forget = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${EndPoint.URL}/users/forgot-password`, {
                email
            });
            if (response.status === 200) {

                setMessage(response.data.message);
                setError('');
                // Redirect to reset password page after 2 seconds
                setTimeout(() => {
                    navigate(`/reset-password/${response.data.token}`);
                }, 2000);
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
            setMessage('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 forget-title">
                        Forgot Password
                    </h2>
                </div>
                <form className="mt-8 space-y-6 forget-form" onSubmit={handleSubmit}>
                    {message && (
                        <div className="text-green-600 text-center forget-message">{message}</div>
                    )}
                    {error && (
                        <div className="text-red-600 text-center forget-message">{error}</div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 forget-form">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className=" forget-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className=" forget-button w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Send Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Forget;
