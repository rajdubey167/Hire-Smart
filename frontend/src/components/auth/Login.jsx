import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-gray-800 font-['Roboto', 'Arial', 'sans-serif'] relative overflow-hidden">
      <Navbar />
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Smooth Landing Animation */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex items-center justify-center px-4 py-12 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full sm:w-[480px] backdrop-blur-md bg-white/30 shadow-2xl border border-white/20 rounded-2xl overflow-hidden"
        >
          {/* Decorative top bar */}
          <div className="h-1 bg-gradient-to-r from-white/50 via-white/30 to-transparent"></div>
          
          <div className="p-8">
            <motion.h1 
              className="mb-2 text-3xl font-bold text-center text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Welcome Back
            </motion.h1>
            
            <motion.p 
              className="mb-8 text-center text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Sign in to continue to your account
            </motion.p>

            <motion.form
              onSubmit={submitHandler}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="space-y-2"
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
                    placeholder="joe@gmail.com"
                    className="w-full pl-10 pr-4 py-3 text-white placeholder-white/50 bg-white/20 border border-white/30 rounded-xl shadow-sm focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-200 backdrop-blur-sm"
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                className="space-y-2"
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                className="space-y-2"
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

              {/* Login Button */}
              {loading ? (
                <Button className="w-full py-3 mt-6 text-white bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Logging in...
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                >
                  <Button
                    type="submit"
                    className="w-full py-3 mt-6 text-white bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300 group"
                  >
                    <span className="flex items-center justify-center">
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </motion.div>
              )}

              <motion.p 
                className="mt-6 text-sm text-center text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="font-medium text-white hover:text-white/90 hover:underline transition-colors duration-200">
                  Sign up here
                </Link>
              </motion.p>
            </motion.form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
