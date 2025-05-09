import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Bell, Menu, X, Home, Briefcase, FolderTree, Building2, Users, UserCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT, NOTIFICATION_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { setSearchedQuery } from '@/redux/jobSlice';
import UserProfileDialog from './UserProfileDialog';

// Color theme constants
const theme = {
  primary: {
    main: '#3B82F6', // Blue
    light: '#60A5FA',
    dark: '#2563EB',
    contrast: '#FFFFFF'
  },
  secondary: {
    main: '#10B981', // Green
    light: '#34D399',
    dark: '#059669',
    contrast: '#FFFFFF'
  },
  accent: {
    main: '#8B5CF6', // Purple
    light: '#A78BFA',
    dark: '#7C3AED',
    contrast: '#FFFFFF'
  },
  background: {
    default: '#FFFFFF',
    paper: '#F9FAFB',
    dark: '#F3F4F6'
  },
  text: {
    primary: '#1F2937',
    secondary: '#4B5563',
    light: '#9CA3AF'
  },
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB'
  }
};

// Import categories data from CategoryCarousel
const categories = [
  {
    groupName: 'General Labor',
    categories: [
      { name: 'General', icon: '👷', displayName: 'General Labor', description: 'Everyday labor tasks and assistance' },
      { name: 'Loading', icon: '📦', displayName: 'Loading/Unloading', description: 'Material handling and transport' },
      { name: 'Helper', icon: '🤝', displayName: 'Helper', description: 'Assistance for various tasks' },
      { name: 'Farming', icon: '🌾', displayName: 'Farming', description: 'Agricultural labor and farm work' }
    ]
  },
  {
    groupName: 'Skilled Trades',
    categories: [
      { name: 'Plumbing', icon: '🔧', displayName: 'Plumbing', description: 'Pipe fitting & repair services' },
      { name: 'Electrical', icon: '⚡', displayName: 'Electrical', description: 'Electrical installation & repair' },
      { name: 'Carpentry', icon: '🪓', displayName: 'Carpentry', description: 'Woodworking & furniture repair' },
      { name: 'Construction', icon: '🏗️', displayName: 'Construction', description: 'Building & construction services' }
    ]
  },
  {
    groupName: 'Home & Property Services',
    categories: [
      { name: 'Cleaning', icon: '🧹', displayName: 'Cleaning', description: 'Thorough cleaning services' },
      { name: 'Gardening', icon: '🌱', displayName: 'Gardening', description: 'Garden maintenance and landscaping' },
      { name: 'Painting', icon: '🖌️', displayName: 'Painting', description: 'Interior & exterior painting' },
      { name: 'Security', icon: '🔒', displayName: 'Security', description: 'Watchman and security services' }
    ]
  },
  {
    groupName: 'Specialized Services',
    categories: [
      { name: 'Driving', icon: '🚗', displayName: 'Driving', description: 'Transport and delivery services' },
      { name: 'Cooking', icon: '🍳', displayName: 'Cooking', description: 'Food preparation services' },
      { name: 'HVAC', icon: '❄️', displayName: 'HVAC Services', description: 'Heating & cooling systems' },
      { name: 'Other', icon: '📋', displayName: 'Other Services', description: 'Additional labor categories' }
    ]
  }
];

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // To track current location for dynamic rendering

    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showCategorySection, setShowCategorySection] = useState(false); // State for category section visibility
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };

    const fetchNotifications = async () => {
        if (user?.role === 'student') {
            try {
                const res = await axios.get(`${NOTIFICATION_API_END_POINT}`, { withCredentials: true });
                setNotifications(res.data.notifications || []);
            } catch (error) {
                console.log('Notification Error:', error?.response?.data?.message || error.message);
            }
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [user]);

    const handleNotificationClick = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/notifications/${id}/read`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const data = await response.json();
            if (data.success) {
                setNotifications((prev) => prev.filter((notif) => notif._id !== id));
            } else {
                console.error('Failed to delete notification:', data.message);
            }
        } catch (err) {
            console.error('Error deleting notification:', err);
        }
    };

    // Toggle category section visibility
    const toggleCategorySection = () => {
        setShowCategorySection(!showCategorySection);
    };

    // Handle category click
    const handleCategoryClick = (categoryName) => {
        dispatch(setSearchedQuery(categoryName));
        navigate("/browse");
        setShowCategorySection(false);
    };

    return (
        <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
        >
            <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
                <div className="flex items-center gap-4">
                    <motion.h1 
                        className="text-3xl font-semibold text-gray-900"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        Hire<span className="text-[#3B82F6] ml-2">Smart</span>
                    </motion.h1>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center lg:hidden">
                    <Button 
                        variant="ghost" 
                        onClick={() => setShowMenu(!showMenu)} 
                        className="text-gray-700 hover:bg-gray-100 rounded-full p-2"
                    >
                        {showMenu ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>

                {/* Overlay */}
                {showMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black bg-opacity-70"
                        onClick={() => setShowMenu(false)}
                    />
                )}

                {/* Side Navigation Menu for Mobile */}
                <AnimatePresence>
                    {showMenu && (
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 w-72 h-screen bg-white z-50 shadow-2xl lg:hidden overflow-y-auto"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-white sticky top-0 z-10">
                                <h1 className="text-2xl font-bold text-gray-900">Menu</h1>
                                <Button variant="ghost" onClick={() => setShowMenu(false)} className="text-gray-700 hover:bg-gray-100 rounded-full p-2">
                                    <X size={24} />
                                </Button>
                            </div>
                            <div className="p-5">
                                <ul className="space-y-3">
                                    {user && user.role === 'recruiter' ? (
                                        <>
                                            <li>
                                                <Link to="/admin/companies" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <Building2 size={20} className="text-blue-500" />
                                                    <span>Companies</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/admin/jobs" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <Briefcase size={20} className="text-blue-500" />
                                                    <span>Jobs</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/admin/jobs/accepted" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <Users size={20} className="text-blue-500" />
                                                    <span>Applicants</span>
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <Home size={20} className="text-blue-500" />
                                                    <span>Home</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/jobs" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <Briefcase size={20} className="text-blue-500" />
                                                    <span>Work</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <button 
                                                    onClick={toggleCategorySection} 
                                                    className="flex items-center gap-3 p-3 w-full text-left text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                >
                                                    <FolderTree size={20} className="text-blue-500" />
                                                    <span>Categories</span>
                                                </button>
                                            </li>
                                        </>
                                    )}

                                    {/* Show Login/Signup in Hamburger Menu */}
                                    {!user && (
                                        <>
                                            <li>
                                                <Link to="/login" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <User2 size={20} className="text-blue-500" />
                                                    <span>Login</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/signup" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <UserCircle size={20} className="text-blue-500" />
                                                    <span>Signup</span>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                                
                                {/* User Profile Section in Mobile Menu */}
                                {user && (
                                    <div className="mt-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="border-2 border-blue-200">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@profile" />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                                                <p className="text-xs text-gray-500">{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                            <Link to="/profile" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">Profile</Link>
                                            <Button 
                                                variant="ghost" 
                                                className="text-sm text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors" 
                                                onClick={logoutHandler}
                                            >
                                                Logout <LogOut size={16} className="ml-1" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Menu */}
                <div className="items-center hidden gap-8 lg:flex">
                    <ul className="flex items-center gap-6 font-medium text-gray-700">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <motion.li 
                                    className="hover:text-[#3B82F6] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/admin/companies" className="flex items-center gap-1">
                                        <Building2 size={18} />
                                        <span>Companies</span>
                                    </Link>
                                </motion.li>
                                <motion.li 
                                    className="hover:text-[#3B82F6] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/admin/jobs" className="flex items-center gap-1">
                                        <Briefcase size={18} />
                                        <span>Jobs</span>
                                    </Link>
                                </motion.li>
                                <motion.li 
                                    className="hover:text-[#3B82F6] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/admin/jobs/accepted" className="flex items-center gap-1">
                                        <Users size={18} />
                                        <span>Applicants</span>
                                    </Link>
                                </motion.li>
                            </>
                        ) : (
                            <>
                                <motion.li 
                                    className="hover:text-[#3B82F6] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/" className="flex items-center gap-1">
                                        <Home size={18} />
                                        <span>Home</span>
                                    </Link>
                                </motion.li>
                                <motion.li 
                                    className="hover:text-[#3B82F6] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/jobs" className="flex items-center gap-1">
                                        <Briefcase size={18} />
                                        <span>Work</span>
                                    </Link>
                                </motion.li>
                                <motion.li 
                                    className="hover:text-[#3B82F6] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <button 
                                        onClick={toggleCategorySection} 
                                        className="flex items-center gap-1"
                                    >
                                        <FolderTree size={18} />
                                        <span>Categories</span>
                                    </button>
                                </motion.li>
                            </>
                        )}
                    </ul>

                    {/* Category Section Dropdown */}
                    <AnimatePresence>
                        {showCategorySection && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-16 left-0 right-0 z-40 p-6 bg-white border-b border-gray-200 shadow-lg"
                            >
                                <div className="mx-auto max-w-7xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800">Browse by Category</h2>
                                        <Button 
                                            variant="ghost" 
                                            onClick={() => setShowCategorySection(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <X size={20} />
                                        </Button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                        {categories.map((section, idx) => (
                                            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                                                <h3 className="mb-4 text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">
                                                    {section.groupName}
                                                </h3>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {section.categories.map((cat, index) => (
                                                        <motion.button
                                                            key={index}
                                                            onClick={() => handleCategoryClick(cat.name)}
                                                            className="flex items-center gap-3 p-3 text-left transition-all duration-300 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-500"
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <span className="flex items-center justify-center w-10 h-10 text-xl bg-blue-100 rounded-full">
                                                                {cat.icon}
                                                            </span>
                                                            <div>
                                                                <h4 className="font-medium text-gray-800">{cat.displayName}</h4>
                                                                <p className="text-xs text-gray-500">{cat.description}</p>
                                                            </div>
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Notification Bell for Students */}
                    {user && user.role === 'student' && (
                        <div className="relative cursor-pointer">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Bell
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="text-gray-700 transition-all hover:text-[#3B82F6]"
                                    size={24}
                                />
                            </motion.div>
                            {notifications.length > 0 && (
                                <motion.span 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-600 rounded-full -top-2 -right-2 shadow-md"
                                >
                                    {notifications.length}
                                </motion.span>
                            )}
                            {showNotifications && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-xl w-80 max-h-96"
                                >
                                    <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                                        <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                                    </div>
                                    
                                    {notifications.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center p-6 text-center">
                                            <Bell className="w-10 h-10 text-gray-300 mb-2" />
                                            <p className="text-sm text-gray-500">No new notifications</p>
                                        </div>
                                    ) : (
                                        <div className="overflow-y-auto max-h-80">
                                            {notifications.map((notif) => (
                                                <motion.div
                                                    key={notif._id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 10 }}
                                                    className="flex items-start p-4 transition-all duration-300 border-b hover:bg-gray-50 group"
                                                >
                                                    <div className="flex-shrink-0 mr-3">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                                                            <Bell size={16} />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-gray-700 group-hover:text-gray-900">{notif.message}</p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {new Date(notif.createdAt).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleNotificationClick(notif._id)}
                                                        className="flex-shrink-0 ml-2 text-xs font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
                                                    >
                                                        Dismiss
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {notifications.length > 0 && (
                                        <div className="p-2 border-t border-gray-100 bg-gray-50">
                                            <button 
                                                onClick={() => {
                                                    notifications.forEach(notif => handleNotificationClick(notif._id));
                                                    setShowNotifications(false);
                                                }}
                                                className="w-full py-1.5 text-xs font-medium text-center text-blue-600 transition hover:text-blue-800 hover:underline"
                                            >
                                                Mark all as read
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    )}

                    {/* User Auth Buttons */}
                    {!user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="outline" className="text-gray-700 transition-all duration-300 border-gray-700 hover:bg-gray-700 hover:text-white">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-all duration-300">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Avatar 
                                className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                                onClick={() => setIsProfileOpen(true)}
                            >
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                            </Avatar>
                            <UserProfileDialog 
                                open={isProfileOpen}
                                setOpen={setIsProfileOpen}
                                user={user}
                                onLogout={logoutHandler}
                            />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
