/* eslint-disable react/prop-types */
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { 
  MoreHorizontal, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Calendar, 
  CheckCircle, 
  XCircle,
  Search,
  Download,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

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

const TableHeaderCell = ({ children, icon }) => (
  <TableHead className="px-4 py-3 font-semibold text-indigo-600">
    <div className="flex items-center gap-2">
      {icon && icon}
      <span className="whitespace-nowrap">{children}</span>
    </div>
  </TableHead>
);

const SearchBar = () => (
  <div className="relative w-full md:w-96">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <Search size={18} className="text-gray-400" />
    </div>
    <input
      type="text"
      className="block w-full p-3 pl-10 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      placeholder="Search applicants..."
    />
  </div>
);

const StatusButton = ({ status, onClick }) => {
  const isAccepted = status === "Accepted";
  
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors duration-200 ${
        isAccepted 
          ? "text-green-700 bg-green-50 hover:bg-green-100" 
          : "text-red-700 bg-red-50 hover:bg-red-100"
      }`}
    >
      {isAccepted ? <CheckCircle size={16} /> : <XCircle size={16} />}
      <span>{status}</span>
    </div>
  );
};

const ResumeLink = ({ resume, originalName }) => {
  if (!resume) return <span className="font-medium text-gray-400">NA</span>;
  
  return (
    <a
      className="flex items-center gap-2 font-medium text-indigo-600 hover:text-indigo-800"
      href={resume}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Download size={16} />
      <span className="truncate max-w-[150px]">{originalName}</span>
    </a>
  );
};

const EmptyState = () => (
  <TableRow>
    <TableCell colSpan="6" className="px-6 py-12 text-center">
      <div className="flex flex-col items-center justify-center">
        <User size={48} className="mb-4 text-gray-400" />
        <p className="text-xl font-medium text-gray-500">No applicants found</p>
        <p className="mt-2 text-sm text-gray-400">When candidates apply for your jobs, they will appear here</p>
      </div>
    </TableCell>
  </TableRow>
);

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const viewResume = (resumeUrl) => {
        if (resumeUrl) {
            window.open(resumeUrl, '_blank');
        } else {
            toast.error("Resume not available");
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl"
            style={{ marginBottom: "470px", paddingBottom: "50px" }}
        >
            <PageHeader 
                title="👥 Recent Applicants" 
                subtitle="Review and manage job applications from candidates"
            />
            
            <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
                <SearchBar />
            </div>
            
            <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <Table className="text-gray-700">
                    <TableCaption className="mt-4 text-sm font-medium text-gray-500">A list of your recent applicants</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-indigo-50">
                            <TableHeaderCell icon={<User size={16} />}>Full Name</TableHeaderCell>
                            <TableHeaderCell icon={<Mail size={16} />}>Email</TableHeaderCell>
                            <TableHeaderCell icon={<Phone size={16} />}>Contact</TableHeaderCell>
                            <TableHeaderCell icon={<FileText size={16} />}>ID-Proof</TableHeaderCell>
                            <TableHeaderCell icon={<Calendar size={16} />}>Date</TableHeaderCell>
                            <TableHead className="px-4 py-3 font-semibold text-right text-indigo-600">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {!applicants || !applicants?.applications || applicants.applications.length === 0 ? (
                                <EmptyState />
                            ) : (
                                applicants.applications.map((item, index) => (
                                    <motion.tr
                                        key={item._id}
                                        variants={itemVariants}
                                        className="transition-colors duration-300 border-b border-gray-100 hover:bg-indigo-50"
                                    >
                                        <TableCell className="px-4 py-4 font-medium">{item?.applicant?.fullname}</TableCell>
                                        <TableCell className="px-4 py-4 font-medium">{item?.applicant?.email}</TableCell>
                                        <TableCell className="px-4 py-4 font-medium">{item?.applicant?.phoneNumber}</TableCell>
                                        <TableCell className="px-4 py-4">
                                            <ResumeLink 
                                                resume={item.applicant?.profile?.resume}
                                                originalName={item?.applicant?.profile?.resumeOriginalName}
                                            />
                                        </TableCell>
                                        <TableCell className="px-4 py-4 font-medium">
                                            {item?.applicant?.createdAt ? item?.applicant?.createdAt.split("T")[0] : 'N/A'}
                                        </TableCell>
                                        <TableCell className="px-4 py-4 text-right">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className="p-2 text-gray-500 transition-colors duration-200 rounded-full hover:text-indigo-500 hover:bg-indigo-50">
                                                        <MoreHorizontal size={20} />
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-48 p-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-xl">
                                                    <div className="flex flex-col gap-1">
                                                        {shortlistingStatus.map((status, index) => (
                                                            <StatusButton 
                                                                key={index}
                                                                status={status}
                                                                onClick={() => statusHandler(status, item?._id)}
                                                            />
                                                        ))}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
};

export default ApplicantsTable;
