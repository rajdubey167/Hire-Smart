import React, { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Star, MapPin, Calendar, Award, FileText } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
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
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white shadow-xl"
        >
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative flex flex-col md:flex-row items-start gap-6">
                <div className="relative">
                    <Avatar className="h-32 w-32 ring-4 ring-white/20 shadow-xl transition-all duration-300 hover:scale-105">
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 flex items-center justify-center w-10 h-10 bg-white rounded-full text-blue-600 shadow-lg">
                        <Star size={20} fill="currentColor" />
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold tracking-tight">{user?.fullname}</h1>
                    <p className="mt-2 text-blue-100">{user?.profile?.bio || 'No bio available'}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                        <Badge className="bg-white/20 text-white border-none">
                            <MapPin size={14} className="mr-1" /> Available for Work
                        </Badge>
                        <Badge className="bg-white/20 text-white border-none">
                            <Calendar size={14} className="mr-1" /> Member since {new Date().getFullYear()}
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={() => setOpen(true)}
                    className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300"
                >
                    <Pen className="mr-2 h-4 w-4" /> Edit Profile
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full">
                    <Mail className="text-blue-500" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-50 rounded-full">
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
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
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
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
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
                    className="flex items-center gap-2 p-3 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                    <FileText size={18} />
                    <span className="font-medium">{user?.profile?.resumeOriginalName}</span>
                </a>
            ) : (
                <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
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
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
        >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Applied Jobs</h2>
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
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
                <ProfileHeader user={user} setOpen={setOpen} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
