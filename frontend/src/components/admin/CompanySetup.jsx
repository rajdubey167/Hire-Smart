/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileImage, Save } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { motion } from 'framer-motion'
import './CompanySetup.css'
import Navbar from '../shared/Navbar'

// Font import for Inter (Professional look)
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'

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
const PageHeader = ({ title, onBack }) => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex items-center gap-4 mb-8"
  >
    <Button 
      onClick={onBack} 
      variant="ghost" 
      className="text-blue-600 transition-transform hover:text-blue-800 hover:scale-105"
    >
      <ArrowLeft className='mr-2' />
      Back
    </Button>
    <h1 className='text-3xl font-extrabold tracking-wider text-transparent md:text-4xl bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'>
      {title}
    </h1>
  </motion.div>
);

const FormField = ({ label, name, value, onChange, type = "text", placeholder, icon, accept, className = "" }) => (
  <motion.div 
    variants={itemVariants}
    className={`flex flex-col ${className}`}
  >
    <Label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
      {icon && icon}
      {label}
    </Label>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      accept={accept}
      className="px-4 py-2 text-gray-800 transition-all duration-300 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400"
      placeholder={placeholder}
    />
  </motion.div>
);

const FileUploadField = ({ label, onChange, accept = "image/*" }) => {
  const [preview, setPreview] = useState(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onChange(e);
    }
  };
  
  return (
    <motion.div 
      variants={itemVariants}
      className="col-span-full"
    >
      <Label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
        <FileImage size={16} />
        {label}
      </Label>
      <div className="flex flex-col items-center justify-center p-6 transition-colors border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100">
        {preview ? (
          <div className="relative w-32 h-32 mb-4">
            <img 
              src={preview} 
              alt="Logo preview" 
              className="object-contain w-full h-full border border-gray-200 rounded-full shadow-sm"
            />
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute p-1 text-white transition-colors bg-red-500 rounded-full shadow-md -top-2 -right-2 hover:bg-red-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 text-blue-500 rounded-full bg-blue-50">
              <FileImage size={32} />
            </div>
            <p className="mb-2 text-sm font-medium text-gray-700">Upload company logo</p>
            <p className="mb-4 text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
          </div>
        )}
        <label className="px-4 py-2 text-sm font-medium text-blue-600 transition-colors bg-white border border-blue-200 rounded-md cursor-pointer hover:bg-blue-50">
          {preview ? "Change logo" : "Select logo"}
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </motion.div>
  );
};

const SubmitButton = ({ loading, text }) => (
  <motion.div
    variants={itemVariants}
    className="mt-8"
  >
    {loading ? (
      <Button 
        className="flex items-center justify-center w-full gap-3 py-5 text-xl font-bold text-blue-500 border border-blue-200 bg-blue-50 rounded-xl"
        disabled
      >
        <Loader2 className='animate-spin' /> Loading...
      </Button>
    ) : (
      <Button 
        type="submit" 
        className="flex items-center justify-center w-full gap-2 py-5 text-xl font-bold text-white transition-all shadow-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-xl hover:brightness-110"
      >
        <Save size={20} />
        {text}
      </Button>
    )}
  </motion.div>
);

const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const { singleCompany } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany])

    // Field configurations
    const fields = [
        { name: "name", label: "Company Name", icon: <Building2 size={16} />, placeholder: "Enter company name" },
        { name: "description", label: "Description", icon: null, placeholder: "Enter company description" },
        { name: "website", label: "Website", icon: <Globe size={16} />, placeholder: "Enter company website" },
        { name: "location", label: "Location", icon: <MapPin size={16} />, placeholder: "Enter company location" }
    ];

    return (
        <div className="min-h-screen font-sans text-gray-800 bg-gray-50">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl p-8 mx-auto mt-16 bg-white border border-gray-200 shadow-lg md:p-10 rounded-2xl"
            >
                <form onSubmit={submitHandler}>
                    <PageHeader 
                        title="Company Setup" 
                        onBack={() => navigate("/admin/companies")} 
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
                                placeholder={field.placeholder}
                                icon={field.icon}
                            />
                        ))}
                        
                        <FileUploadField
                            label="Company Logo"
                            onChange={changeFileHandler}
                        />
                    </motion.div>

                    <SubmitButton 
                        loading={loading} 
                        text="Update Company" 
                    />
                </form>
            </motion.div>
        </div>
    )
}

export default CompanySetup
