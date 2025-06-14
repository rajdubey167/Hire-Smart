/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Clock, IndianRupee } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const LatestJobCards = ({ job, index }) => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const isOnHomePage = location.pathname === '/';

  const handleCardClick = () => {
    if (user) {
      navigate(`/description/${job._id}`);
    } else {
      navigate('/login');
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.1 + 0.2
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={handleCardClick}
      className={`relative p-6 overflow-hidden transition-all duration-300 border shadow-lg cursor-pointer rounded-xl backdrop-blur-md hover:shadow-2xl ${
        isOnHomePage 
          ? 'bg-white border-gray-200 hover:border-indigo-500/30' 
          : 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border-gray-800 hover:border-indigo-500/30'
      }`}
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 transition-opacity duration-500 opacity-0 ${
        isOnHomePage 
          ? 'bg-gradient-to-br from-indigo-50 via-transparent to-purple-50' 
          : 'bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/10'
      } group-hover:opacity-100`}></div>
      
      {/* Decorative elements */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-tl-full opacity-50 ${
        isOnHomePage 
          ? 'bg-gradient-to-br from-indigo-100 to-transparent' 
          : 'bg-gradient-to-br from-indigo-900/20 to-transparent'
      }`}></div>
      <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-br-full opacity-50 ${
        isOnHomePage 
          ? 'bg-gradient-to-tr from-purple-100 to-transparent' 
          : 'bg-gradient-to-tr from-purple-900/20 to-transparent'
      }`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.p 
            variants={badgeVariants}
            className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
              isOnHomePage 
                ? 'text-gray-600 border border-gray-200 bg-gray-50' 
                : 'text-gray-400 border border-gray-700 bg-gray-800/80'
            }`}
          >
            {new Date(job?.createdAt).toLocaleDateString()}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="ghost" 
              className={`rounded-full ${
                isOnHomePage 
                  ? 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100' 
                  : 'text-gray-400 hover:text-indigo-400 hover:bg-gray-800/80'
              }`} 
              size="icon"
            >
              <Bookmark size={18} />
            </Button>
          </motion.div>
        </div>

        <motion.div 
          variants={badgeVariants}
          className="mb-5"
        >
          <h1 className={`mb-2 text-xl font-bold text-transparent bg-clip-text ${
            isOnHomePage 
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
              : 'bg-gradient-to-r from-indigo-400 to-purple-400'
          }`}>{job?.title}</h1>
          <p className={`text-sm leading-relaxed line-clamp-3 ${
            isOnHomePage ? 'text-gray-600' : 'text-gray-300'
          }`}>{job?.description}</p>
        </motion.div>

        <motion.div 
          variants={badgeVariants}
          className="flex flex-wrap items-center gap-2"
        >
          <Badge className={`px-3 py-1 text-xs font-medium border rounded-full backdrop-blur-sm ${
            isOnHomePage 
              ? 'text-indigo-600 border-indigo-200 bg-indigo-50' 
              : 'text-indigo-400 border-indigo-900/50 bg-gray-800/50'
          }`} variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            {job?.position} days
          </Badge>
          <Badge className={`px-3 py-1 text-xs font-medium border rounded-full backdrop-blur-sm ${
            isOnHomePage 
              ? 'text-pink-600 border-pink-200 bg-pink-50' 
              : 'text-pink-400 border-pink-900/50 bg-gray-800/50'
          }`} variant="outline">
            {job?.jobType}
          </Badge>
          <Badge className={`px-3 py-1 text-xs font-medium border rounded-full backdrop-blur-sm ${
            isOnHomePage 
              ? 'text-blue-600 border-blue-200 bg-blue-50' 
              : 'text-blue-400 border-blue-900/50 bg-gray-800/50'
          }`} variant="outline">
            <IndianRupee className="w-3 h-3 mr-1" />
            {job?.salary}/hr
          </Badge>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
