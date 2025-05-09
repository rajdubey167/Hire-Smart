import React, { useEffect, useMemo, useState } from 'react';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';
import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, Clock, Building2, Sparkles } from 'lucide-react';
import Navbar from './shared/Navbar';

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    dispatch(setSearchedQuery(value));
  };

  // Calculate unique companies, locations, and recent jobs
  const stats = useMemo(() => {
    if (!allJobs || allJobs.length === 0) {
      return { companies: 0, locations: 0, recentJobs: 0 };
    }

    // Get unique companies
    const uniqueCompanies = new Set(allJobs.map(job => job?.company?._id)).size;
    
    // Get unique locations
    const uniqueLocations = new Set(allJobs.map(job => job?.location)).size;
    
    // Count jobs posted today (within last 24 hours)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const recentJobs = allJobs.filter(job => {
      const jobDate = new Date(job?.createdAt);
      return jobDate >= today;
    }).length;

    return {
      companies: uniqueCompanies,
      locations: uniqueLocations,
      recentJobs
    };
  }, [allJobs]);

  // Filter jobs based on search query
  const filteredJobs = useMemo(() => {
    if (!searchedQuery) return allJobs;
    
    return allJobs.filter(job => {
      const searchLower = searchedQuery.toLowerCase();
      return (
        job?.title?.toLowerCase().includes(searchLower) ||
        job?.description?.toLowerCase().includes(searchLower) ||
        job?.location?.toLowerCase().includes(searchLower) ||
        job?.company?.name?.toLowerCase().includes(searchLower)
      );
    });
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900 text-white font-sans">
      <Navbar />
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15),transparent_50%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_70%)]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8"
      >
        {/* Header Section */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1.5 bg-indigo-500/20 rounded-full border border-indigo-500/30"
          >
            <span className="flex items-center gap-1.5 text-indigo-300 text-sm font-medium">
              <Sparkles size={16} />
              Discover Opportunities
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 mb-4"
          >
            {searchedQuery ? `Results for "${searchedQuery}"` : 'Browse All Jobs'}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available for you to explore
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-10"
        >
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-indigo-400" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search jobs by title, company, or keyword..."
              className="w-full pl-12 pr-4 py-4 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 shadow-lg"
            />
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4 flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400">
              <Building2 size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Companies</p>
              <p className="text-white font-semibold">{stats.companies}</p>
            </div>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4 flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Locations</p>
              <p className="text-white font-semibold">{stats.locations}</p>
            </div>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4 flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 text-purple-400">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Posted Today</p>
              <p className="text-white font-semibold">{stats.recentJobs}</p>
            </div>
          </div>
        </motion.div>

        {/* Job Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden"
        >
          {filteredJobs.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Briefcase className="h-10 w-10 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">No jobs found</h3>
              <p className="text-gray-400 max-w-md mx-auto">Try adjusting your search or filters to find more opportunities. We're constantly adding new jobs to our platform.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredJobs.map((job, idx) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-indigo-500/50 shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="p-5">
                    <Job job={job} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Browse;
