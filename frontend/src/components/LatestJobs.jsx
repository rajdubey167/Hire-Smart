import { motion } from 'framer-motion';
import { Briefcase, Sparkles } from 'lucide-react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LatestJobs.css';

// Animation variants for staggered animations
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

// Section Header Component
const SectionHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="section-header"
    >
      <div className="section-badge">
        <Briefcase size={16} />
        <span>Job Opportunities</span>
      </div>
      <h2 className="section-title">Latest & Top Job Openings</h2>
      <p className="section-description">
        Discover the most recent job opportunities that match your skills and experience
      </p>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="empty-state"
    >
      <div className="empty-state-icon">
        <Briefcase size={48} />
      </div>
      <h3 className="empty-state-title">No Jobs Available</h3>
      <p className="empty-state-description">
        Check back later for new opportunities or try adjusting your search criteria
      </p>
    </motion.div>
  );
};

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const navigate = useNavigate();
  const hasJobs = allJobs.length > 0;
  const displayedJobs = hasJobs ? allJobs.slice(0, 6) : [];

  return (
    <section className="latest-jobs-section">
      <div className="container">
        <SectionHeader />
        
        {hasJobs ? (
          <motion.div 
            className="jobs-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayedJobs.map((job, index) => (
              <motion.div key={job._id} variants={itemVariants}>
                <LatestJobCards job={job} index={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState />
        )}
        
        {hasJobs && (
          <motion.div 
            className="view-all-jobs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button 
              onClick={() => navigate('/browse')} 
              className="view-all-button"
            >
              View All Jobs <Sparkles size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
