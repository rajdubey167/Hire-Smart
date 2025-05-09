import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2, User, Mail, Phone, Lock, Upload, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: '',
  });
  const [previewImage, setPreviewImage] = useState(null);

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      <Navbar />
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="flex items-center justify-center min-h-screen py-12 px-4 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-lg backdrop-blur-md bg-white/30 shadow-2xl border border-white/20 rounded-2xl overflow-hidden"
        >
          {/* Decorative top bar */}
          <div className="h-1 bg-gradient-to-r from-white/50 via-white/30 to-transparent"></div>
          
          <div className="p-8">
            <motion.h1
              className="mb-2 text-3xl font-bold text-center text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Create Your Account
            </motion.h1>
            
            <motion.p
              className="mb-8 text-center text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Join our community and start your journey today
            </motion.p>

            <motion.form
              onSubmit={submitHandler}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Full Name Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Label className="text-sm font-medium text-white">Full Name</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-white/70" />
                  </div>
                  <Input
                    type="text"
                    value={input.fullname}
                    name="fullname"
                    onChange={changeEventHandler}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 text-white placeholder-white/50 bg-white/20 border border-white/30 rounded-xl shadow-sm focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-200 backdrop-blur-sm"
                  />
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Label className="text-sm font-medium text-white">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-white/70" />
                  </div>
                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="johndoe@gmail.com"
                    className="w-full pl-10 pr-4 py-3 text-white placeholder-white/50 bg-white/20 border border-white/30 rounded-xl shadow-sm focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-200 backdrop-blur-sm"
                  />
                </div>
              </motion.div>

              {/* Phone Number Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Label className="text-sm font-medium text-white">Phone Number</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="w-5 h-5 text-white/70" />
                  </div>
                  <Input
                    type="text"
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEventHandler}
                    placeholder="9839298567"
                    className="w-full pl-10 pr-4 py-3 text-white placeholder-white/50 bg-white/20 border border-white/30 rounded-xl shadow-sm focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-200 backdrop-blur-sm"
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Label className="text-sm font-medium text-white">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-white/70" />
                  </div>
                  <Input
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="********"
                    className="w-full pl-10 pr-4 py-3 text-white placeholder-white/50 bg-white/20 border border-white/30 rounded-xl shadow-sm focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-200 backdrop-blur-sm"
                  />
                </div>
              </motion.div>

              {/* Role Selection */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <Label className="text-sm font-medium text-white">I am a</Label>
                <div className="flex gap-4 p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/20">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role === 'student'}
                      onChange={changeEventHandler}
                      className="w-4 h-4 text-indigo-600 border-white/30 focus:ring-white/50"
                    />
                    <span className="text-sm font-medium text-white">Labour</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/20">
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role === 'recruiter'}
                      onChange={changeEventHandler}
                      className="w-4 h-4 text-indigo-600 border-white/30 focus:ring-white/50"
                    />
                    <span className="text-sm font-medium text-white">Recruiter</span>
                  </label>
                </div>
              </motion.div>

              {/* File Upload */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <Label className="text-sm font-medium text-white">Profile Photo</Label>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-24 h-24 overflow-hidden rounded-full bg-white/20 border-2 border-white/30">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-white/50">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Upload className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="relative">
                      <Input
                        accept="image/*"
                        type="file"
                        onChange={changeFileHandler}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full pl-10 pr-4 py-3 text-white placeholder-white/50 bg-white/20 border border-white/30 rounded-xl shadow-sm focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-200 backdrop-blur-sm flex items-center justify-between">
                        <span className="text-white/70">{input.file ? input.file.name : 'Select a photo'}</span>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200">
                          <Upload className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/60 mt-1">Upload a profile photo (optional)</p>
              </motion.div>

              {/* Submit Button */}
              {loading ? (
                <Button className="w-full py-3 mt-6 text-white bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </Button>
              ) : (
                <motion.button
                  type="submit"
                  className="w-full py-3 mt-6 text-white bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <span className="flex items-center justify-center">
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </motion.button>
              )}

              <motion.div 
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <span className="text-sm text-white/80">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-white hover:text-white/90 hover:underline transition-colors duration-200">
                    Login
                  </Link>
                </span>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
