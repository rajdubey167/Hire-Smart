/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Search, ArrowRight, MapPin, Briefcase, Sparkles, Building2, Users, Clock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

// Stats Card Component
const StatCard = ({ icon: Icon, value, label }) => (
    <motion.div 
        className="flex flex-col items-center justify-center p-4 border bg-white/10 backdrop-blur-md rounded-xl border-white/20"
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <div className="p-2 mb-2 text-pink-400 rounded-full bg-white/10">
        <Icon size={20} />
        </div>
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-sm text-gray-300">{label}</span>
    </motion.div>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div 
        className="flex items-start p-4 border bg-white/10 backdrop-blur-md rounded-xl border-white/20"
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <div className="p-2 mr-4 text-pink-400 rounded-full bg-white/10">
        <Icon size={20} />
        </div>
        <div>
        <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
        </div>
    </motion.div>
);

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    // Array of background images to be used dynamically
    const backgroundImage = [
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9ufGVufDB8MHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnN0cnVjdGlvbnxlbnwwfDB8MHx8fDA%3D'
    ];

    // Select one random image from the array for background
    const selectedImage = backgroundImage[Math.floor(Math.random() * backgroundImage.length)];

    return (
        <Swiper
            loop={false}
            slidesPerView={1}
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            className="relative w-full h-screen overflow-x-hidden"
        >
            <SwiperSlide>
                <div className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center">
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage: `url(${selectedImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.15),transparent_50%)]"></div>
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.15),transparent_50%)]"></div>
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 text-sm font-medium text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                        >
                            <Sparkles size={16} className="text-pink-400" />
                            <span>Find Your Next Opportunity</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.div 
                            className="flex flex-col gap-3 mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                                <span className="block">Find Skilled</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Labor Workers</span>
                                <span className="block">Near You</span>
                            </h1>
                            <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-300 md:text-xl">
                                Connect with qualified professionals for your projects or find work opportunities in your area
                            </p>
                        </motion.div>

                        {/* Search Box */}
                        <motion.div
                            className="z-10 flex items-center justify-center w-full px-4 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                        >
                            <div className="relative w-full max-w-2xl">
                                {/* Glowing Border */}
                                <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl blur-md opacity-70 animate-pulse z-0" />

                                <div className="relative z-10 flex items-center justify-between gap-3 px-5 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.2)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(236,72,153,0.2)]">
                                    <div className="flex items-center w-full gap-3">
                                        <Search className="text-pink-400 shrink-0" size={22} />
                                        <input
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search for jobs, companies, or skills..."
                                            className="w-full text-base font-medium tracking-wide text-white bg-transparent outline-none placeholder:text-gray-400"
                                        />
                                    </div>

                                    {/* Button */}
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: '#ec4899',
                                            boxShadow: '0px 0px 20px rgba(236,72,153,0.5)',
                                        }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                        onClick={searchJobHandler}
                                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg shadow-pink-500/30 transition-all duration-300"
                                    >
                                        <span>Find</span>
                                        <ArrowRight size={18} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3"
                        >
                            <StatCard icon={Building2} value="500+" label="Companies" />
                            <StatCard icon={Users} value="10,000+" label="Workers" />
                            <StatCard icon={Clock} value="24/7" label="Support" />
                        </motion.div>

                        {/* Features Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2"
                        >
                            <FeatureCard 
                                icon={MapPin} 
                                title="Local Opportunities" 
                                description="Find work in your neighborhood with our location-based search" 
                            />
                            <FeatureCard 
                                icon={Briefcase} 
                                title="Verified Workers" 
                                description="All workers are background-checked and skill-verified" 
                            />
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="flex flex-wrap items-center justify-center gap-4 mt-4"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 text-sm text-white border rounded-full bg-white/10 backdrop-blur-md border-white/20">
                                <MapPin size={16} className="text-pink-400" />
                                <span>Local Jobs</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 text-sm text-white border rounded-full bg-white/10 backdrop-blur-md border-white/20">
                                <Briefcase size={16} className="text-purple-400" />
                                <span>Popular Categories</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default HeroSection;
