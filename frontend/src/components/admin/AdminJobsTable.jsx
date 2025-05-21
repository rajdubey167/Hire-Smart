/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  Eye, 
  Building2, 
  Briefcase, 
  Calendar, 
  Users, 
  FileText,
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
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="font-sans text-3xl font-bold tracking-wide text-indigo-600 md:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 font-medium text-gray-500">{subtitle}</p>}
      </div>
    </div>
  </motion.div>
);

const JobCard = ({ job, onViewApplicants }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="overflow-hidden transition-shadow duration-300 bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-lg"
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {job?.company?.logo ? (
              <img 
                src={job?.company?.logo} 
                alt={job?.company?.name} 
                className="object-cover w-12 h-12 border-2 border-indigo-100 rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 border-2 border-indigo-100 rounded-full">
                <Building2 size={24} className="text-indigo-500" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{job?.title || 'Untitled Job'}</h3>
              <p className="font-medium text-gray-600">{job?.company?.name || 'Unknown Company'}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4">
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
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700"
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
      className="flex flex-col items-center justify-center p-12 bg-white border border-gray-100 shadow-md rounded-xl"
    >
      <FileText size={64} className="mb-4 text-gray-300" />
      <h3 className="mb-2 text-xl font-semibold text-gray-700">No job posts found</h3>
      <p className="max-w-md mb-6 text-center text-gray-500">You haven&apos;t posted any jobs yet. Create your first job posting to start attracting candidates.</p>
      <button 
        onClick={() => navigate('/admin/post-job')}
        className="flex items-center justify-center gap-2 px-6 py-3 text-white transition-colors duration-200 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
