/* eslint-disable react/prop-types */
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

// User Profile Header Component
const UserProfileHeader = ({ user }) => {
  return (
    <motion.div 
      className="flex items-center gap-3 p-3 border border-indigo-100 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50"
      variants={itemVariants}
    >
      <div className="relative">
        <Avatar className="w-12 h-12 border-2 border-white shadow-md">
          <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
        </Avatar>
        <div className="absolute flex items-center justify-center w-4 h-4 bg-green-500 border-2 border-white rounded-full -bottom-1 -right-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </div>
      <div>
        <h3 className="text-base font-semibold text-gray-800">{user?.fullname}</h3>
        <p className="text-xs text-gray-500">{user?.email}</p>
        <p className="text-xs text-indigo-600 mt-0.5">{user?.role || 'User'}</p>
      </div>
    </motion.div>
  );
};

// Menu Item Component
const MenuItem = ({ icon, label, onClick, isDanger = false }) => {
  return (
    <motion.button
      variants={itemVariants}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center gap-2 w-full p-2 rounded-md transition-colors ${
        isDanger 
          ? 'text-red-600 hover:bg-red-50' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <div className={`flex items-center justify-center w-7 h-7 rounded-full ${
        isDanger ? 'bg-red-100' : 'bg-indigo-100'
      }`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
};

// User Profile Dialog Component
const UserProfileDialog = ({ open, setOpen, user, onLogout }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg sm:max-w-xs">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-lg font-bold text-gray-800">Account</DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Manage your account settings
          </DialogDescription>
        </DialogHeader>
        
        <motion.div 
          className="p-4 space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <UserProfileHeader user={user} />
          
          <div className="space-y-0.5 pt-1">
            <MenuItem 
              icon={<User size={16} className="text-indigo-600" />} 
              label="View Profile" 
              onClick={() => {
                setOpen(false);
                // Navigate to profile page
                window.location.href = '/profile';
              }} 
            />
          </div>
          
          <div className="pt-2 border-t border-gray-100">
            <MenuItem 
              icon={<LogOut size={16} className="text-red-600" />} 
              label="Logout" 
              onClick={onLogout}
              isDanger={true}
            />
          </div>
        </motion.div>
        
        <div className="p-3 text-xs text-center text-gray-500 border-t border-gray-100 bg-gray-50">
          © {new Date().getFullYear()} Hire Smart
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog; 