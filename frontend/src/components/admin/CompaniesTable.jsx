import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Edit2, Search, Building2, Calendar } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
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

// Reusable components
const TableHeader = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-8"
  >
    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mb-2">
      {title}
    </h2>
    {subtitle && <p className="text-center text-gray-500">{subtitle}</p>}
  </motion.div>
);

const SearchBar = ({ value, onChange }) => (
  <div className="relative mb-6">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    <Input
      type="text"
      placeholder="Search companies..."
      value={value}
      onChange={onChange}
      className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
    />
  </div>
);

const ActionButton = ({ icon, label, onClick, variant = "default" }) => (
  <Button
    onClick={onClick}
    variant={variant}
    className={`flex items-center gap-2 ${
      variant === "outline" 
        ? "border border-gray-200 hover:bg-gray-50" 
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
  >
    {icon}
    <span>{label}</span>
  </Button>
);

const CompanyRow = ({ company, index, onEdit }) => (
  <motion.tr
    key={company._id}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.01, backgroundColor: "rgba(243, 244, 246, 0.8)" }}
    className="hover:bg-gray-50/80 transition-all duration-300"
  >
    <td className="px-6 py-4">
      <Avatar className="w-10 h-10 border border-gray-200 shadow-md">
        <AvatarImage src={company.logo} className="object-cover rounded-full" />
      </Avatar>
    </td>
    <td className="px-6 py-4">
      <div>
        <div className="text-lg font-semibold tracking-wide text-gray-800">{company.name}</div>
        <div className="text-sm text-gray-500">{company.email}</div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2 text-gray-600">
        <Calendar size={16} />
        <span className="text-sm">{company.createdAt.split('T')[0]}</span>
      </div>
    </td>
    <td className="px-6 py-4 text-right">
      <Popover>
        <PopoverTrigger>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <MoreHorizontal className="h-4 w-4 text-gray-500 hover:text-blue-600 transition-colors" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 bg-white border border-gray-200 text-gray-800 shadow-lg rounded-lg">
          <div className="py-1">
            <button
              onClick={() => onEdit(company._id)}
              className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-50 hover:text-blue-600 rounded-md transition"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Company</span>
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </td>
  </motion.tr>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="py-12 text-center"
  >
    <div className="flex justify-center mb-4">
      <Building2 size={48} className="text-gray-300" />
    </div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">No companies found</h3>
    <p className="text-gray-500 mb-6">There are no companies registered in the system yet.</p>
  </motion.div>
);

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter(company =>
      searchCompanyByText
        ? company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        : true
    );
    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term) {
      const filtered = companies.filter(company =>
        company?.name?.toLowerCase().includes(term.toLowerCase())
      );
      setFilterCompany(filtered);
    } else {
      setFilterCompany(companies);
    }
  };

  const handleEdit = (companyId) => {
    navigate(`/admin/companies/${companyId}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 rounded-2xl shadow-lg border border-gray-200 transition-all duration-500 px-6 md:px-12 py-10 font-[Inter]"
    >
      <TableHeader 
        title="🔥 Registered Companies" 
        subtitle="Manage and view all companies registered on the platform"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={handleSearch} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden"
      >
        {filterCompany.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 tracking-wider">
              <tr>
                <th className="px-6 py-4">Logo</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {filterCompany.map((company, index) => (
                  <CompanyRow 
                    key={company._id} 
                    company={company} 
                    index={index} 
                    onEdit={handleEdit} 
                  />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        ) : (
          <EmptyState />
        )}
      </motion.div>
    </motion.div>
  );
};

export default CompaniesTable;
