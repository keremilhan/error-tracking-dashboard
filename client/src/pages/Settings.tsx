import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';
import { updateEmail, updateName, updatePassword } from '../services/authService';
import { AlertType } from '../types/types';
import { Alert } from '../components';
import PasswordTracker from '../components/PasswordTracker';
import { validatePasswordRequirements } from '../utils/functions';

const Settings = () => {
    const {
        authState: { email, name },
        update,
    } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const [username, setUsername] = useState(name);
    const [userEmail, setUserEmail] = useState(email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value);
    };
    const handleChangeCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
    };

    const handleSetAlert = (type: AlertType, message: string, duration: number) => {
        setAlert({ type, message });
        setTimeout(() => {
            setAlert(null);
        }, duration);
    };

    const handleSubmitName = async () => {
        if (username === name) {
            return handleSetAlert('warning', 'You are trying to assign the same name.', 3000);
        }
        if (username) {
            showLoading();
            try {
                const result = await updateName(email, username);
                if (result.status === 200) {
                    handleSetAlert('success', result.data.message, 3000);
                    update({ name: username });
                }
            } catch (error) {
                handleSetAlert('danger', error.response.data.msg, 3000);
            } finally {
                hideLoading();
            }
        }
    };

    const handleSubmitEmail = async () => {
        if (userEmail === email) {
            return handleSetAlert('warning', 'You are trying to assign the same email.', 3000);
        }
        if (username) {
            showLoading();
            try {
                const result = await updateEmail(email, userEmail);
                if (result.status === 200) {
                    handleSetAlert('success', result.data.message, 3000);
                    update({ email: userEmail });
                }
            } catch (error) {
                handleSetAlert('danger', error.response.data.msg, 3000);
            } finally {
                hideLoading();
            }
        }
    };

    const handleSubmitPassword = async () => {
        if (currentPassword === updatedPassword) {
            return handleSetAlert('warning', 'You are trying to assign the same password.', 3000);
        }
        const passwordError = validatePasswordRequirements(updatedPassword);
        if (passwordError) {
            return handleSetAlert('warning', passwordError, 3000);
        }
        if (updatedPassword) {
            showLoading();
            try {
                const result = await updatePassword(email, currentPassword, updatedPassword);
                if (result.status === 200) {
                    handleSetAlert('success', result.data.message, 3000);
                    update({ token: result.data.token });
                    setCurrentPassword('');
                    setUpdatedPassword('');
                }
            } catch (error) {
                handleSetAlert('danger', error.response.data.msg, 3000);
            } finally {
                hideLoading();
            }
        }
    };

    return (
        <div className="w-full h-full col-span-8 sm:px-8">
            {alert && (
                <div className="h-16">
                    <Alert type={alert.type} message={alert.message} />
                </div>
            )}
            <div className="pt-2 sm:pt-4">
                <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
                <p className="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <hr className="mt-4 sm:mb-8 mb-4" />
            <p className="py-2 text-xl font-semibold">Name</p>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3 md:items-center">
                <label htmlFor="name">
                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        <input
                            type="text"
                            id="name"
                            value={username}
                            onChange={handleUsernameChange}
                            className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                            placeholder="***********"
                        />
                    </div>
                </label>
                <button onClick={handleSubmitName} className="h-full rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white self-start md:self-auto">
                    Save Name
                </button>
            </div>
            <hr className="mt-4 sm:mb-8 mb-4" />
            <p className="py-2 text-xl font-semibold">Email Address</p>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3 md:items-center">
                <label htmlFor="email">
                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        <input
                            type="text"
                            id="email"
                            value={userEmail}
                            onChange={handleUserEmailChange}
                            className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                            placeholder="***********"
                        />
                    </div>
                </label>
                <button onClick={handleSubmitEmail} className="mt-4 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white self-start md:self-auto">
                    Save Email
                </button>
            </div>
            <hr className="mt-4 sm:mb-8 mb-4" />
            <p className="py-2 text-xl font-semibold">Password</p>
            <div className="flex flex-col space-y-2 justify-start items-start">
                <label htmlFor="current-password">
                    <span className="text-sm text-gray-500">Current Password</span>
                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        <input
                            type="password"
                            id="current-password"
                            value={currentPassword}
                            onChange={handleChangeCurrentPassword}
                            className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                            placeholder="***********"
                        />
                    </div>
                </label>
                <PasswordTracker password={updatedPassword} setPassword={setUpdatedPassword} />
            </div>
            <p className="mt-2">
                Can't remember your current password.{' '}
                <a className="text-sm font-semibold text-blue-600 hover:underline decoration-2" href="#">
                    Recover Account
                </a>
            </p>
            <button onClick={handleSubmitPassword} className="mt-4 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white">
                Save Password
            </button>
        </div>
    );
};

export default Settings;
