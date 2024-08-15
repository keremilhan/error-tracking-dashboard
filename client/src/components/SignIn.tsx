'use client';
import { FormEvent, useState } from 'react';
import { BiSolidShow, BiSolidHide } from 'react-icons/bi';
import Alert from './Alert';
import useCapsLockDetector from '../hooks/useCapsLockDetector';
import { useNavigate } from 'react-router-dom';
import { isSafari } from '../utils/functions';
import { useLoading } from '../hooks/useLoading';
import { AlertType } from '../types/types';
import { useAuth } from '../hooks/useAuth';
import { signIn } from '../services/authService';

const SignIn: React.FC<{ toggleHasAccount: () => void }> = ({ toggleHasAccount }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInputFocus, setPasswordInputFocus] = useState(false);
    const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
    const { showLoading, hideLoading } = useLoading();
    const capsLockOn = useCapsLockDetector();

    const { login } = useAuth();

    const navigate = useNavigate();

    const toggleShowPassword = (e: any) => {
        e.preventDefault();
        setShowPassword(prev => !prev);
    };

    const handleSetAlert = (type: AlertType, message: string, duration: number) => {
        setAlert({ type, message });
        setTimeout(() => {
            setAlert(null);
        }, duration);
    };

    const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        if (email && password) {
            showLoading();
            try {
                const result = await signIn(email, password);
                if (result.status === 200) {
                    handleSetAlert('success', result.data.message, 3000);
                    login(result.data.user);
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                }
            } catch (error) {
                handleSetAlert('danger', error.response.data.msg, 3000);
            } finally {
                hideLoading();
            }
        }
    };

    const baseClass = 'absolute top-1/2 transform -translate-y-1/2 cursor-pointer';
    const rightPositionClass = capsLockOn ? (isSafari() ? 'right-14' : 'right-3') : !isSafari() ? 'right-3' : 'right-10';

    return (
        <div className="flex min-h-full flex-1 flex-col justify-start p-0 sm:px-6 sm:py-12 lg:px-8 w-full">
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Sign In</h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {alert && (
                    <div className="h-16">
                        <Alert type={alert.type} message={alert.message} />
                    </div>
                )}
                <form className="space-y-6" onSubmit={handleSignIn}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-start">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2 relative -z-40">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onFocus={() => setPasswordInputFocus(true)}
                                onBlur={() => setPasswordInputFocus(false)}
                            />
                            {passwordInputFocus && (
                                <div className={`${baseClass} ${rightPositionClass}`} onMouseDown={toggleShowPassword}>
                                    {showPassword ? <BiSolidShow /> : <BiSolidHide />}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a onClick={toggleHasAccount} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
