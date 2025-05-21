/* eslint-disable react/prop-types */
import { Button } from './ui/button';
import { Bookmark, MapPin, Clock, IndianRupee, ArrowRight } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Job = ({ job, index }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    // Enhanced animation variants
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.95,
            filter: "blur(10px)"
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        hover: {
            scale: 1.02,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const badgeVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: index * 0.1 + 0.2,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="group relative h-full flex flex-col p-6 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 hover:border-indigo-500/30 shadow-lg hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
        >
            {/* Enhanced gradient background */}
            <div className="absolute inset-0 transition-opacity duration-700 opacity-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/10 group-hover:opacity-100"></div>
            
            {/* Modern decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-tl-full opacity-50 bg-gradient-to-br from-indigo-900/20 via-transparent to-transparent blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-br-full opacity-50 bg-gradient-to-tr from-purple-900/20 via-transparent to-transparent blur-xl"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.1),transparent_70%)]"></div>
            
            <div className="relative z-10 flex flex-col h-full">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-5">
                    <motion.p 
                        variants={badgeVariants}
                        className="text-xs font-medium text-gray-400 bg-gray-800/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-700/20"
                    >
                        {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </motion.p>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button variant="ghost" className="text-gray-400 transition-colors duration-300 rounded-full hover:text-indigo-400 hover:bg-gray-800/30" size="icon">
                            <Bookmark size={18} />
                        </Button>
                    </motion.div>
                </div>

                {/* Company Info Section */}
                <motion.div 
                    variants={badgeVariants}
                    className="flex items-center gap-4 mb-6"
                >
                    <div className="p-2 transition-colors duration-300 border rounded-full border-indigo-900/20 bg-gray-800/30 backdrop-blur-sm group-hover:border-indigo-500/30">
                        <Avatar className="w-12 h-12 transition-all duration-300 ring-2 ring-gray-800/30 group-hover:ring-indigo-500/20">
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400">{job?.company?.name}</h1>
                        <p className="flex items-center text-sm text-gray-400">
                            <MapPin className="h-4 w-4 mr-1.5" />
                            India
                        </p>
                    </div>
                </motion.div>

                {/* Job Details Section */}
                <motion.div 
                    variants={badgeVariants}
                    className="flex-grow mb-6"
                >
                    <h1 className="mb-3 text-xl font-bold text-transparent transition-all duration-300 bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 group-hover:from-cyan-300 group-hover:via-indigo-300 group-hover:to-purple-400">{job?.title}</h1>
                    <p className="text-sm leading-relaxed text-gray-300/90 line-clamp-3">{job?.description}</p>
                </motion.div>

                {/* Badges Section */}
                <motion.div 
                    variants={badgeVariants}
                    className="flex flex-wrap items-center gap-2 mb-6"
                >
                    <Badge className="text-xs font-medium text-indigo-400 border border-indigo-900/20 bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-1.5 group-hover:border-indigo-500/30 transition-all duration-300" variant="outline">
                        <Clock className="w-3 h-3 mr-1.5" />
                        {job?.position} days
                    </Badge>
                    <Badge className="text-xs font-medium text-pink-400 border border-pink-900/20 bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-1.5 group-hover:border-pink-500/30 transition-all duration-300" variant="outline">
                        {job?.jobType}
                    </Badge>
                    <Badge className="text-xs font-medium text-blue-400 border border-blue-900/20 bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-1.5 group-hover:border-blue-500/30 transition-all duration-300" variant="outline">
                        <IndianRupee className="w-3 h-3 mr-1.5" />
                        {job?.salary}/hr
                    </Badge>
                </motion.div>

                {/* Action Buttons Section */}
                <motion.div 
                    variants={badgeVariants}
                    className="flex gap-3 mt-auto"
                >
                    <Button
                        onClick={() => navigate(`/description/${job?._id}`)}
                        className="flex-1 text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-500 hover:via-indigo-600 hover:to-indigo-700 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                        variant="outline"
                    >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                    <Button
                        className="flex-1 relative z-10 text-white shadow-sm bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-500 hover:via-indigo-600 hover:to-indigo-700 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300"
                        onClick={() => navigate('/login')}
                    >
                        Log in to Apply
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Job;
