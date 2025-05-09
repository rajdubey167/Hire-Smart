import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  MoreHorizontal, 
  Eye, 
  Building2, 
  Briefcase, 
  Calendar, 
  Users, 
  FileText,
  ArrowRight,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

// Reusable components
const PageHeader = ({ title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-8"
  >
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 tracking-wide font-sans">
          {title}
        </h2>
        {subtitle && <p className="text-gray-500 mt-2 font-medium">{subtitle}</p>}
      </div>
    </div>
  </motion.div>
);

const JobCard = ({ job, index, onViewApplicants }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {job?.company?.logo ? (
              <img 
                src={job?.company?.logo} 
                alt={job?.company?.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-100">
                <Building2 size={24} className="text-indigo-500" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{job?.title || 'Untitled Job'}</h3>
              <p className="text-gray-600 font-medium">{job?.company?.name || 'Unknown Company'}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-1 text-gray-600">
            <Calendar size={16} className="text-indigo-500" />
            <span className="text-sm font-medium">{job?.createdAt ? job?.createdAt.split("T")[0] : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Users size={16} className="text-indigo-500" />
            <span className="text-sm font-medium">
              {job?.applicants?.length || job?.applications?.length || 0} Applicants
            </span>
          </div>
          {job?.salary && (
            <div className="flex items-center gap-1 text-gray-600">
              <Briefcase size={16} className="text-indigo-500" />
              <span className="text-sm font-medium">₹{job?.salary.toLocaleString()}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <button 
            onClick={onViewApplicants}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <Eye size={16} />
            <span>View Applicants</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const EmptyState = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-md border border-gray-100"
    >
      <FileText size={64} className="mb-4 text-gray-300" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No job posts found</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">You haven't posted any jobs yet. Create your first job posting to start attracting candidates.</p>
      <button 
        onClick={() => navigate('/admin/post-job')}
        className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
      >
        <Plus size={20} />
        <span className="font-medium">Post a Job</span>
      </button>
    </motion.div>
  );
};

const AdminJobsTable = () => {
  const { allAdminJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6"
      style={{ marginBottom: "370px" }}
    >
      <PageHeader 
        title="🔥 Your Job Posts" 
        subtitle="Manage and track all your job listings"
      />

      <AnimatePresence>
        {allAdminJobs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAdminJobs.map((job, index) => (
              <JobCard 
                key={job._id}
                job={job}
                index={index}
                onViewApplicants={() => navigate(`/admin/jobs/${job._id}/applicants`)}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminJobsTable;
