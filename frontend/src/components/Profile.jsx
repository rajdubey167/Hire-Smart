/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Star, MapPin, Calendar, Award, FileText } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'
import Navbar from './shared/Navbar'

// Profile Header Component
const ProfileHeader = ({ user, setOpen }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-8 overflow-hidden text-white shadow-xl rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600"
        >
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative flex flex-col items-start gap-6 md:flex-row">
                <div className="relative">
                    <Avatar className="w-32 h-32 transition-all duration-300 shadow-xl ring-4 ring-white/20 hover:scale-105">
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                    </Avatar>
                    <div className="absolute flex items-center justify-center w-10 h-10 text-blue-600 bg-white rounded-full shadow-lg -bottom-2 -right-2">
                        <Star size={20} fill="currentColor" />
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold tracking-tight">{user?.fullname}</h1>
                    <p className="mt-2 text-blue-100">{user?.profile?.bio || 'No bio available'}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                        <Badge className="text-white border-none bg-white/20">
                            <MapPin size={14} className="mr-1" /> Available for Work
                        </Badge>
                        <Badge className="text-white border-none bg-white/20">
                            <Calendar size={14} className="mr-1" /> Member since {new Date().getFullYear()}
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={() => setOpen(true)}
                    className="text-blue-600 transition-all duration-300 bg-white hover:bg-blue-50"
                >
                    <Pen className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
            </div>
        </motion.div>
    )
}

// Contact Info Component
const ContactInfo = ({ user }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
            <div className="flex items-center gap-4 p-4 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                    <Mail className="text-blue-500" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-50">
                    <Contact className="text-purple-500" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{user?.phoneNumber}</p>
                </div>
            </div>
        </motion.div>
    )
}

// Skills Component
const SkillsSection = ({ user }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl"
        >
            <div className="flex items-center gap-2 mb-4">
                <Award className="text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-2">
                {user?.profile?.skills?.length !== 0
                    ? user?.profile?.skills.map((item, index) => (
                        <Badge
                            key={index}
                            className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-4 py-1.5 text-sm font-medium hover:bg-blue-100 transition-colors"
                        >
                            {item}
                        </Badge>
                    ))
                    : <span className="text-gray-400">No skills added yet</span>}
            </div>
        </motion.div>
    )
}

// ID Proof Component
const IDProofSection = ({ user }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl"
        >
            <div className="flex items-center gap-2 mb-4">
                <FileText className="text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">ID Proof</h2>
            </div>
            {isResume ? (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={user?.profile?.resume}
                    className="flex items-center gap-2 p-3 text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
                >
                    <FileText size={18} />
                    <span className="font-medium">{user?.profile?.resumeOriginalName}</span>
                </a>
            ) : (
                <div className="p-4 text-center text-gray-500 rounded-lg bg-gray-50">
                    No ID proof uploaded yet
                </div>
            )}
        </motion.div>
    )
}

// Applied Jobs Component
const AppliedJobsSection = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl"
        >
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Applied Jobs</h2>
            <AppliedJobTable />
        </motion.div>
    )
}

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-5xl px-4 py-8 mx-auto space-y-6">
                <ProfileHeader user={user} setOpen={setOpen} />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <ContactInfo user={user} />
                    <SkillsSection user={user} />
                </div>
                <IDProofSection user={user} />
                <AppliedJobsSection />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
