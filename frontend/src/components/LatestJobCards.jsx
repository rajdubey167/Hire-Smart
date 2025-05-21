/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Clock, IndianRupee } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const LatestJobCards = ({ job, index }) => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

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
      className="relative p-6 overflow-hidden transition-all duration-300 border border-gray-800 shadow-lg cursor-pointer bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl backdrop-blur-md hover:shadow-2xl hover:border-indigo-500/30"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/10 group-hover:opacity-100"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-tl-full opacity-50 bg-gradient-to-br from-indigo-900/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-br-full opacity-50 bg-gradient-to-tr from-purple-900/20 to-transparent"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.p 
            variants={badgeVariants}
            className="px-3 py-1 text-xs font-medium text-gray-400 border border-gray-700 rounded-full bg-gray-800/80 backdrop-blur-sm"
          >
            {new Date(job?.createdAt).toLocaleDateString()}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" className="text-gray-400 rounded-full hover:text-indigo-400 hover:bg-gray-800/80" size="icon">
              <Bookmark size={18} />
            </Button>
          </motion.div>
        </div>

        <motion.div 
          variants={badgeVariants}
          className="mb-5"
        >
          <h1 className="mb-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{job?.title}</h1>
          <p className="text-sm leading-relaxed text-gray-300 line-clamp-3">{job?.description}</p>
        </motion.div>

        <motion.div 
          variants={badgeVariants}
          className="flex flex-wrap items-center gap-2"
        >
          <Badge className="px-3 py-1 text-xs font-medium text-indigo-400 border rounded-full border-indigo-900/50 bg-gray-800/50 backdrop-blur-sm" variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            {job?.position} days
          </Badge>
          <Badge className="px-3 py-1 text-xs font-medium text-pink-400 border rounded-full border-pink-900/50 bg-gray-800/50 backdrop-blur-sm" variant="outline">
            {job?.jobType}
          </Badge>
          <Badge className="px-3 py-1 text-xs font-medium text-blue-400 border rounded-full border-blue-900/50 bg-gray-800/50 backdrop-blur-sm" variant="outline">
            <IndianRupee className="w-3 h-3 mr-1" />
            {job?.salary}/hr
          </Badge>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
