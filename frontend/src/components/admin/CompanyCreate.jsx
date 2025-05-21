/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import Footer from '../shared/Footer'
import { motion } from 'framer-motion'
import { Building2, ArrowLeft, Rocket, Loader2 } from 'lucide-react'
import Navbar from '../shared/Navbar'

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
const PageHeader = ({ title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-10 text-center"
  >
    <h1 className="text-3xl font-extrabold text-transparent md:text-4xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text">
      {title}
    </h1>
    {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
  </motion.div>
);

const FormField = ({ label, value, onChange, placeholder, icon }) => (
  <motion.div 
    variants={itemVariants}
    className="mb-6"
  >
    <Label className="flex items-center gap-2 text-sm font-medium text-blue-600">
      {icon && icon}
      {label}
    </Label>
    <Input
      type="text"
      className="mt-2 text-gray-800 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </motion.div>
);

const ActionButton = ({ icon, label, onClick, variant = "primary", loading = false }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all ${
      variant === "primary" 
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-500" 
        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
    }`}
    onClick={onClick}
    disabled={loading}
  >
    {loading ? (
      <Loader2 className="animate-spin" size={16} />
    ) : (
      <>
        {icon}
        {label}
      </>
    )}
  </motion.button>
);

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Please enter a company name");
            return;
        }
        
        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to create company");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-gray-800 font-[Inter] bg-gray-50">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-3xl px-6 py-12 mx-auto mt-16 bg-white border border-gray-200 shadow-lg rounded-2xl"
                style={{marginBottom:"324px"}}
            >
                <PageHeader 
                    title="Register Yourself/Company" 
                    subtitle="Give your company/yourself a name — you can always change it later."
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <FormField 
                        label="Company Name" 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="JobHunt, Microsoft etc."
                        icon={<Building2 size={16} />}
                    />

                    <motion.div 
                        variants={itemVariants}
                        className="flex items-center justify-center gap-4 mt-10"
                    >
                        <ActionButton 
                            icon={<ArrowLeft size={16} />}
                            label="Cancel"
                            variant="secondary"
                            onClick={() => navigate("/admin/companies")}
                        />
                        <ActionButton 
                            icon={<Rocket size={16} />}
                            label="Continue"
                            loading={loading}
                            onClick={registerNewCompany}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
            <Footer />
        </div>
    );
};

export default CompanyCreate;
