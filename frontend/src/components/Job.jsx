import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative p-6 bg-white border border-gray-200 shadow-sm rounded-xl backdrop-blur-md overflow-hidden hover:shadow-md transition-all duration-300"
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-transparent rounded-tl-full opacity-50"></div>
            
            <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="ghost" className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full" size="icon">
                    <Bookmark size={18} />
                </Button>
            </div>

            <div className="flex items-center gap-4 mb-5">
                <div className="p-2 border border-indigo-100 rounded-full bg-indigo-50/50">
                    <Avatar className="w-12 h-12 ring-2 ring-white">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        India
                    </p>
                </div>
            </div>

            <div className="mb-5">
                <h1 className="text-xl font-bold text-indigo-600 mb-2">{job?.title}</h1>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{job?.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
                <Badge className="text-xs font-medium text-indigo-600 border border-indigo-200 bg-indigo-50 rounded-full px-3 py-1" variant="outline">
                    Deadline: {job?.position} days
                </Badge>
                <Badge className="text-xs font-medium text-pink-500 border border-pink-200 bg-pink-50 rounded-full px-3 py-1" variant="outline">
                    {job?.jobType}
                </Badge>
                <Badge className="text-xs font-medium text-blue-500 border border-blue-200 bg-blue-50 rounded-full px-3 py-1" variant="outline">
                    {job?.salary} Per/Hr
                </Badge>
            </div>

            <div className="flex gap-3">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className="flex-1 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    variant="outline"
                >
                    View Details
                </Button>
                <Button
                    className="flex-1 relative z-10 text-white shadow-sm bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
                    onClick={() => navigate('/login')}
                >
                    Log in to Apply
                </Button>
            </div>
        </motion.div>
    );
};

export default Job;
