import { useEffect, useState } from 'react'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Footer from './shared/Footer'
import { SlidersHorizontal } from 'lucide-react'
import Navbar from './shared/Navbar'

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)
    const [isFilterVisible, setIsFilterVisible] = useState(false)

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"
        >
            <Navbar />
            <div className='px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8'>
                <div className='flex flex-col gap-8'>
                    <div className='flex justify-between items-center'>
                        <h1 className="text-2xl font-bold text-gray-800">Available Jobs</h1>
                        <button 
                            onClick={toggleFilter}
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <SlidersHorizontal className="h-5 w-5 text-indigo-600" />
                            <span className="text-gray-700 font-medium">Filter</span>
                        </button>
                    </div>
                    
                    <div className='flex flex-col md:flex-row gap-8'>
                        {isFilterVisible && (
                            <div className='md:w-1/4'>
                                <FilterCard isVisible={isFilterVisible} onClose={toggleFilter} />
                            </div>
                        )}
                        <div className={`${isFilterVisible ? 'md:w-3/4' : 'w-full'}`}>
                            {filterJobs.length <= 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-20 text-center"
                                >
                                    <div className="inline-block p-6 rounded-full bg-gray-100 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-700">No jobs found</h3>
                                    <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
                                </motion.div>
                            ) : (
                                <div className='h-[88vh] overflow-y-auto pb-5 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
                                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr'>
                                        {filterJobs.map((job, index) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                                key={job?._id}
                                                className="h-full flex"
                                            >
                                                <div className="w-full">
                                                    <Job job={job} />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </motion.div>
    )
}

export default Jobs
