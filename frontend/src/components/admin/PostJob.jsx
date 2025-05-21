/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, Briefcase, MapPin, Clock, Award, Users, Building2, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
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
    className="mb-8 text-center"
  >
    <h2 className="text-3xl font-bold tracking-wide text-gray-800 md:text-4xl">
      {title}
    </h2>
    {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
  </motion.div>
);

const FormField = ({ label, name, value, onChange, type = "text", placeholder, icon }) => (
  <motion.div 
    variants={itemVariants}
    className="mb-4"
  >
    <Label className="flex items-center gap-2 text-gray-700">
      {icon && icon}
      {label}
    </Label>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="my-1 text-gray-800 transition-all bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
    />
  </motion.div>
);

const CompanySelect = ({ companies, onSelect }) => (
  <motion.div 
    variants={itemVariants}
    className="col-span-1 mb-4 md:col-span-2"
  >
    <Label className="flex items-center gap-2 text-gray-700">
      <Building2 size={16} />
      Select Company
    </Label>
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-full text-gray-800 bg-white border border-gray-300 hover:border-blue-400">
        <SelectValue placeholder="Select a Company" />
      </SelectTrigger>
      <SelectContent className="text-gray-800 bg-white border border-blue-200">
        <SelectGroup>
          {companies.map((company) => (
            <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
              {company.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </motion.div>
);

const SubmitButton = ({ loading }) => (
  <motion.div
    variants={itemVariants}
    className="mt-6"
  >
    {loading ? (
      <Button className="w-full text-white bg-blue-600 shadow-md hover:bg-blue-700">
        <Loader2 className='w-4 h-4 mr-2 animate-spin' /> Please wait
      </Button>
    ) : (
      <Button type="submit" className="flex items-center justify-center w-full gap-2 font-bold tracking-wider text-white bg-blue-600 hover:bg-blue-700">
        <Rocket size={16} />
        Post New Job
      </Button>
    )}
  </motion.div>
);

const WarningMessage = () => (
  <motion.p 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className='mt-4 text-sm font-semibold text-center text-red-600'
  >
    *Please register a company first before posting jobs
  </motion.p>
);

// Custom Rupee Icon component
const RupeeIcon = ({ size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="text-gray-700"
  >
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    // Field configurations
    const fields = [
        { name: "title", label: "Job Title", icon: <Briefcase size={16} />, placeholder: "e.g. Senior Developer" },
        { name: "description", label: "Description", icon: null, placeholder: "Job description" },
        { name: "requirements", label: "Requirements", icon: null, placeholder: "Job requirements" },
        { name: "salary", label: "Salary", icon: <RupeeIcon size={16} />, placeholder: "e.g. ₹50,000 - ₹70,000" },
        { name: "location", label: "Location", icon: <MapPin size={16} />, placeholder: "e.g. Mumbai, India" },
        { name: "jobType", label: "Working Shift", icon: <Clock size={16} />, placeholder: "e.g. Full-time, Remote" },
        { name: "experience", label: "Experience Level", icon: <Award size={16} />, placeholder: "e.g. 3-5 years" },
        { name: "position", label: "Days Required", icon: <Users size={16} />, type: "number", placeholder: "e.g. 5" }
    ];

    return (
        <div className="min-h-screen text-gray-800 font-[Inter] bg-gradient-to-b from-gray-50 to-white">
            <Navbar />
            <div className="flex items-center justify-center w-screen px-6 my-10">
                <motion.form 
                    onSubmit={submitHandler} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-5xl p-8 transition-all duration-500 bg-white border border-gray-200 shadow-lg md:p-10 hover:shadow-xl rounded-2xl"
                >
                    <PageHeader 
                        title="💼 Post a New Job" 
                        subtitle="Fill in the details to create a new job posting"
                    />
                    
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                        {fields.map((field, index) => (
                            <FormField
                                key={index}
                                label={field.label}
                                name={field.name}
                                value={input[field.name]}
                                onChange={changeEventHandler}
                                type={field.type || "text"}
                                placeholder={field.placeholder}
                                icon={field.icon}
                            />
                        ))}
                        
                        {companies.length > 0 && (
                            <CompanySelect 
                                companies={companies} 
                                onSelect={selectChangeHandler} 
                            />
                        )}
                    </motion.div>
                    
                    <SubmitButton loading={loading} />
                    
                    {companies.length === 0 && <WarningMessage />}
                </motion.form>
            </div>
        </div>
    )
}

export default PostJob