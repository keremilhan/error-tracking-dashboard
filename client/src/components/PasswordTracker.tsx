import { useReducer, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';

const PasswordTracker: React.FC<{ password: string; setPassword: (param: string) => void }> = ({ password, setPassword }) => {
    const initialState = {
        sixChars: false,
        lowerLetter: false,
        upperLetter: false,
        digit: false,
    };

    const initialReducer = (state: any, action: { type: any; key: any; value: any }) => {
        switch (action.type) {
            case 'updateCondition':
                return {
                    ...state,
                    [action.key]: action.value,
                };
            case 'reset':
                return {
                    ...initialState,
                };
            default:
                return state;
        }
    };

    const [passwordRequirements, dispatch] = useReducer(initialReducer, initialState);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const passwordStrengthLevel = (strength: number) => {
        switch (strength) {
            case 0:
                return 'Very Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Medium';
            case 3:
                return 'Strong';
            case 4:
                return 'Excellent';

            default:
                break;
        }
    };

    const validatePassword = (value: string) => {
        // Check for at least 6 characters

        if (value.length >= 6) {
            if (!passwordRequirements.sixChars) {
                dispatch({ type: 'updateCondition', key: 'sixChars', value: true });
                setPasswordStrength(prev => prev + 1);
            }
        } else {
            if (passwordRequirements.sixChars) {
                dispatch({ type: 'updateCondition', key: 'sixChars', value: false });
                setPasswordStrength(prev => prev - 1);
            }
        }

        // Check for at least 1 lowercase character
        if (/[a-z]/.test(value)) {
            if (!passwordRequirements.lowerLetter) {
                dispatch({ type: 'updateCondition', key: 'lowerLetter', value: true });
                setPasswordStrength(prev => prev + 1);
            }
        } else {
            if (passwordRequirements.lowerLetter) {
                dispatch({ type: 'updateCondition', key: 'lowerLetter', value: false });
                setPasswordStrength(prev => prev - 1);
            }
        }

        // Check for at least 1 uppercase character
        if (/[A-Z]/.test(value)) {
            if (!passwordRequirements.upperLetter) {
                dispatch({ type: 'updateCondition', key: 'upperLetter', value: true });
                setPasswordStrength(prev => prev + 1);
            }
        } else {
            if (passwordRequirements.upperLetter) {
                dispatch({ type: 'updateCondition', key: 'upperLetter', value: false });
                setPasswordStrength(prev => prev - 1);
            }
        }

        // Check for at least 1 digit
        if (/\d/.test(value)) {
            if (!passwordRequirements.digit) {
                dispatch({ type: 'updateCondition', key: 'digit', value: true });
                setPasswordStrength(prev => prev + 1);
            }
        } else {
            if (passwordRequirements.digit) {
                dispatch({ type: 'updateCondition', key: 'digit', value: false });
                setPasswordStrength(prev => prev - 1);
            }
        }
    };
    const handlePasswordChange = (e: any) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };
    const passwordStrengthColors = ['bg-gray-300', 'bg-red-500', 'bg-orange-300', 'bg-yellow-300', 'bg-green-500'];

    return (
        <>
            <label htmlFor="updated-password">
                <span className="text-sm text-gray-500">New Password</span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                        type="password"
                        id="updated-password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                        placeholder="***********"
                    />
                </div>
            </label>
            <div className="flex-column items-center justify-between">
                <div className="mt-4 flex items-center gap-4 justify-between">
                    <p className="text-xs font-medium leading-6 text-gray-900">Password strength</p>
                    <div className={`h-2 w-[100px] max-w-md bg-gray-400 rounded-full overflow-hidden`}>
                        <div className={`h-full ${passwordStrengthColors[passwordStrength]} transition-all duration-500 ease-in-out`} style={{ width: `${passwordStrength * 25}%` }}></div>
                    </div>
                    <p className="text-xs font-medium leading-6 text-gray-900 w-20 text-end">{passwordStrengthLevel(passwordStrength)}</p>
                </div>
                <div className="mt-2 block text-xs font-medium leading-6 text-gray-600">Must contain at least</div>
                <ul className="list-none text-xs font-medium leading-6 text-gray-400">
                    <li className={`flex items-center gap-1 ${passwordRequirements.sixChars && 'text-gray-900'}`}>
                        {passwordRequirements.sixChars ? <FaCheck color="green" /> : <GoDotFill />} 6 characters
                    </li>
                    <li className={`flex items-center gap-1 ${passwordRequirements.lowerLetter && 'text-gray-900'}`}>
                        {passwordRequirements.lowerLetter ? <FaCheck color="green" /> : <GoDotFill />} 1 lower case character
                    </li>
                    <li className={`flex items-center gap-1 ${passwordRequirements.upperLetter && 'text-gray-900'}`}>
                        {passwordRequirements.upperLetter ? <FaCheck color="green" /> : <GoDotFill />} 1 upper case character
                    </li>
                    <li className={`flex items-center gap-1 ${passwordRequirements.digit && 'text-gray-900'}`}>{passwordRequirements.digit ? <FaCheck color="green" /> : <GoDotFill />} 1 digit</li>
                </ul>
            </div>
        </>
    );
};

export default PasswordTracker;
