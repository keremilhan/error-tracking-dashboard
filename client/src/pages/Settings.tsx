import { useAuth } from '../hooks/useAuth';

const Settings = () => {
    const {
        authState: { email, name },
    } = useAuth();
    return (
        <div className="w-full h-full col-span-8 sm:px-8">
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
                            value={name}
                            className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                            placeholder="***********"
                        />
                    </div>
                </label>
                <button className="h-full rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white self-start md:self-auto">Save Name</button>
            </div>
            <hr className="mt-4 sm:mb-8 mb-4" />
            <p className="py-2 text-xl font-semibold">Email Address</p>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3 md:items-center">
                <label htmlFor="email">
                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        <input
                            type="text"
                            id="email"
                            value={email}
                            className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                            placeholder="***********"
                        />
                    </div>
                </label>
                <button className="mt-4 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white self-start md:self-auto">Save Email</button>
            </div>
            <hr className="mt-4 sm:mb-8 mb-4" />
            <p className="py-2 text-xl font-semibold">Password</p>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3 md:items-center">
                <label htmlFor="login-password">
                    <span className="text-sm text-gray-500">Current Password</span>
                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        <input
                            type="password"
                            id="login-password"
                            className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                            placeholder="***********"
                        />
                    </div>
                </label>
                <label htmlFor="login-password">
                    <span className="text-sm text-gray-500">New Password</span>
                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        <input
                            type="password"
                            id="login-password"
                            className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                            placeholder="***********"
                        />
                    </div>
                </label>
            </div>
            <p className="mt-2">
                Can't remember your current password.{' '}
                <a className="text-sm font-semibold text-blue-600 hover:underline decoration-2" href="#">
                    Recover Account
                </a>
            </p>
            <button className="mt-4 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white">Save Password</button>
        </div>
    );
};

export default Settings;
