import React, { useState } from 'react'
import {
    Table, TableBody, TableCaption, TableCell,
    TableHead, TableHeader, TableRow
} from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job)
    const [feedbackInput, setFeedbackInput] = useState({})
    const [loadingFeedbackId, setLoadingFeedbackId] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [activeJobId, setActiveJobId] = useState(null)

    const handleFeedbackSubmit = async (appliedJobId) => {
        const feedbackText = feedbackInput[appliedJobId]?.trim()
        if (!feedbackText) {
            toast.error("Feedback cannot be empty!")
            return
        }

        try {
            setLoadingFeedbackId(appliedJobId)

            const token = localStorage.getItem("token")

            await axios.post(
                `http://localhost:3000/api/v1/application/feedback-to-applicant/${appliedJobId}`,
                { feedback: feedbackText },
                { withCredentials: true }
            )

            toast.success("Feedback submitted!")
        } catch (err) {
            toast.error("Error submitting feedback")
        } finally {
            setLoadingFeedbackId(null)
            setShowModal(false)
        }
    }

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating)
        const halfStars = rating % 1 >= 0.5 ? 1 : 0
        const emptyStars = 5 - fullStars - halfStars

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} className="text-yellow-400" />
                ))}
                {[...Array(halfStars)].map((_, i) => (
                    <FaStar key={`half-${i}`} className="text-yellow-400" />
                ))}
                {[...Array(emptyStars)].map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
                ))}
            </div>
        )
    }

    return (
        <div className="relative">
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Feedback</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    You haven't applied to any job yet.
                                </TableCell>
                            </TableRow>
                        ) : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell>
                                    <Badge className={`${appliedJob?.status === "rejected"
                                        ? 'bg-red-400'
                                        : appliedJob.status === 'pending'
                                            ? 'bg-gray-400'
                                            : 'bg-green-400'
                                        }`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {appliedJob?.paymentStatus ? (
                                        <Badge className={`${appliedJob?.paymentStatus === "Paid"
                                            ? 'bg-green-400'
                                            : 'bg-yellow-400'
                                            }`}>
                                            {appliedJob.paymentStatus.toUpperCase()}
                                        </Badge>
                                    ) : (
                                        <span className="text-gray-500">Not Available</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {appliedJob?.rating ? (
                                        <div className="flex items-center gap-1">
                                            {renderStars(appliedJob.rating.score)}
                                            {appliedJob.rating.review && (
                                                <span className="ml-2 text-gray-400 text-sm pl-4">
                                                    "{appliedJob.rating.review}"
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-gray-500">No Rating</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {appliedJob.feedback ? (
                                        <span className="text-gray-400 text-sm">"{appliedJob.feedback}"</span>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setShowModal(true)
                                                setActiveJobId(appliedJob._id)
                                            }}
                                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full shadow-md hover:scale-105 transition duration-200"
                                        >
                                            Give Feedback
                                        </button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center animate-fade-in">
                    <div className="bg-zinc-900 text-white p-6 rounded-xl w-96 shadow-xl border border-zinc-700 relative">
                        <h2 className="text-xl font-bold mb-4">Give Feedback</h2>
                        <textarea
                            rows={4}
                            placeholder="Write your feedback here..."
                            value={feedbackInput[activeJobId] || ""}
                            onChange={(e) =>
                                setFeedbackInput({
                                    ...feedbackInput,
                                    [activeJobId]: e.target.value,
                                })
                            }
                            className="w-full bg-zinc-800 p-3 rounded-lg text-sm border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => {
                                    setShowModal(false)
                                    setActiveJobId(null)
                                }}
                                className="px-4 py-1 bg-zinc-700 hover:bg-zinc-600 rounded-md text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleFeedbackSubmit(activeJobId)}
                                disabled={loadingFeedbackId === activeJobId}
                                className="px-4 py-1 bg-pink-600 hover:bg-pink-700 rounded-md text-sm"
                            >
                                {loadingFeedbackId === activeJobId ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AppliedJobTable
