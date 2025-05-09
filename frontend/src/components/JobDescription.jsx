import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, IndianRupee, Briefcase, FileText } from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real-time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            } finally {
                // Add a small delay to ensure smooth animation
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
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
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <>
            <Navbar/>
            <motion.div 
                className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {isLoading ? (
                    <div className="flex justify-center items-center h-[70vh]">
                        <motion.div 
                            className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                ) : (
                    <motion.div 
                        className='max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.7,
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                        }}
                    >
                        {/* Header Section */}
                        <motion.div 
                            className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 text-white"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <motion.h1 
                                        className='font-bold text-3xl md:text-4xl mb-2'
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                    >
                                        {singleJob?.title}
                                    </motion.h1>
                                    <motion.div 
                                        className='flex flex-wrap items-center gap-2 mt-3'
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <motion.div variants={itemVariants}>
                                            <Badge className="bg-indigo-500/30 text-white border-none px-3 py-1">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {singleJob?.applications?.length} days
                                            </Badge>
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <Badge className="bg-emerald-500/30 text-white border-none px-3 py-1">
                                                <Briefcase className="h-4 w-4 mr-1" />
                                                {singleJob?.jobType}
                                            </Badge>
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <Badge className="bg-blue-500/30 text-white border-none px-3 py-1">
                                                <IndianRupee className="h-4 w-4 mr-1" />
                                                {singleJob?.salary} Per/Hr
                                            </Badge>
                                        </motion.div>
                                    </motion.div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                >
                                    <Button
                                        onClick={isApplied ? null : applyJobHandler}
                                        disabled={isApplied}
                                        className={`rounded-lg py-6 px-8 text-lg font-semibold transition-all transform ${
                                            isApplied 
                                                ? 'bg-gray-600 cursor-not-allowed' 
                                                : 'bg-white text-indigo-700 hover:bg-indigo-50 hover:scale-105'
                                        }`}
                                    >
                                        {isApplied ? 'Already Applied' : 'Apply Now'}
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Content Section */}
                        <motion.div 
                            className="p-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <div className="mb-8">
                                <motion.h2 
                                    className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                >
                                    <FileText className="h-6 w-6 mr-2 text-indigo-600" />
                                    Job Description
                                </motion.h2>
                                <motion.div 
                                    className="bg-gray-50 rounded-xl p-6 space-y-6"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.div className="flex items-start" variants={itemVariants}>
                                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                                            <Briefcase className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700">Role</h3>
                                            <p className="text-gray-600">{singleJob?.title}</p>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div className="flex items-start" variants={itemVariants}>
                                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                                            <MapPin className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700">Location</h3>
                                            <p className="text-gray-600">{singleJob?.location}</p>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div className="flex items-start" variants={itemVariants}>
                                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                                            <FileText className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700">Description</h3>
                                            <p className="text-gray-600">{singleJob?.description}</p>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div className="flex items-start" variants={itemVariants}>
                                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                                            <IndianRupee className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700">Charge</h3>
                                            <p className="text-gray-600">₹{singleJob?.salary} Per/Hr</p>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div className="flex items-start" variants={itemVariants}>
                                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                                            <Clock className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700">Deadline</h3>
                                            <p className="text-gray-600">{singleJob?.applications?.length} days</p>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div className="flex items-start" variants={itemVariants}>
                                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                                            <Calendar className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700">Posted Date</h3>
                                            <p className="text-gray-600">{singleJob?.createdAt.split("T")[0]}</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
            <Footer/>
        </>
    )
}

export default JobDescription;
