import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { MenuItem } from '../types/types';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFullyExpanded, setIsFullyExpanded] = useState(true);

    const {
        logout,
        authState: { accessToken },
    } = useAuth();

    let MENU: MenuItem[] = [{ text: 'Home', href: '/', icon: FaHome }];

    if (accessToken) {
        MENU = [...MENU, { text: 'Dashboard', href: '/dashboard', icon: MdSpaceDashboard }, { text: 'Profile', href: '/profile', icon: FaUser }, { text: 'Settings', href: '/settings', icon: FaCog }];
    }
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setTimeout(() => {
            navigate('/auth');
        }, 500);
    };

    const toggleSidebar = () => {
        if (isCollapsed) {
            setIsCollapsed(false);
            setTimeout(() => {
                setIsFullyExpanded(true);
            }, 200);
        } else {
            setIsCollapsed(true);
            setIsFullyExpanded(false);
        }
    };

    return (
        <aside className="bg-gray-800 h-fit sm:h-full">
            <div className={`flex flex-col h-full p-2 sm:p-5 bg-gray-800 text-white transition-all duration-500 relative ${isCollapsed ? 'sm:w-[89px]' : 'sm:w-64'} w-full`}>
                <button
                    onClick={toggleSidebar}
                    className={`p-3 px-1 text-xl mb-6 self-end focus:outline-none cursor-pointer w-fit hidden sm:block absolute top-4 ${
                        isCollapsed ? 'mx-auto -right-4 rounded-e-2xl bg-gray-800 text-white' : 'right-0 rounded-s-2xl bg-white text-gray-800'
                    } `}
                >
                    {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
                <div className="flex sm:flex-col gap-2 sm:gap-4">
                    {MENU.map(({ text, href, icon: Icon }, index) => (
                        <NavLink
                            to={href}
                            key={index}
                            className={({ isActive }) =>
                                isActive
                                    ? 'flex justify-center sm:justify-normal items-center hover:bg-gray-500 p-2 rounded h-10 w-full cursor-pointer bg-gray-700 px-3 py-2 text-md font-medium'
                                    : 'flex justify-center sm:justify-normal items-center p-2 rounded h-10 w-full cursor-pointer hover:bg-gray-700 hover:text-white px-3 py-2 text-md font-medium'
                            }
                        >
                            <Icon size={25} />
                            {isFullyExpanded && <span className="ml-3 hidden sm:block">{text}</span>}
                        </NavLink>
                    ))}
                    {accessToken ? (
                        <Link
                            to="#"
                            onClick={handleLogout}
                            className="flex justify-center sm:justify-normal items-center p-2 rounded h-10 w-full cursor-pointer hover:bg-gray-700 hover:text-white px-3 py-2 text-md font-medium"
                        >
                            <FaSignOutAlt size={25} />
                            {isFullyExpanded && <span className="ml-3 hidden sm:block">Logout</span>}
                        </Link>
                    ) : (
                        <NavLink
                            to="auth"
                            className={({ isActive }) =>
                                isActive
                                    ? 'flex justify-center sm:justify-normal items-center hover:bg-gray-500 p-2 rounded h-10 w-full cursor-pointer bg-gray-700 px-3 py-2 text-md font-medium'
                                    : 'flex justify-center sm:justify-normal items-center p-2 rounded h-10 w-full cursor-pointer hover:bg-gray-700 hover:text-white px-3 py-2 text-md font-medium'
                            }
                        >
                            <FaSignInAlt size={25} />
                            {isFullyExpanded && <span className="ml-3 hidden sm:block">Login</span>}
                        </NavLink>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
