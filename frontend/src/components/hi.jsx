import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { FaStar, FaRegStar } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);
    const [feedbackInput, setFeedbackInput] = useState({});
    const [loadingFeedbackId, setLoadingFeedbackId] = useState(null);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

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
        );
    };

    const handleFeedbackSubmit = async (appliedJobId) => {
        const feedbackText = feedbackInput[appliedJobId]?.trim();
        if (!feedbackText) {
            toast.error("Feedback cannot be empty!");
            return;
        }

    try {
        setLoadingFeedbackId(appliedJobId);

        const token = localStorage.getItem("token"); // ⬅️ get token from storage

        const res = await axios.post(
            `http://localhost:3000/api/v1/application/feedback-to-applicant/${appliedJobId}`,
            { feedback: feedbackText },
            {
                withCredentials: true, // 🔥 this sends cookies
            }
        );
        

        toast.success("Feedback submitted!");
    } catch (err) {
        toast.error("Error submitting feedback");
    } finally {
        setLoadingFeedbackId(null);
    }
};

    

    return (
        <div>
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
                    {allAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={7}>
                                <span className="text-gray-500">You haven&apos;t applied to any jobs yet.</span>
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>

                                <TableCell>
                                    <Badge className={
                                        appliedJob?.status === "rejected"
                                            ? 'bg-red-400'
                                            : appliedJob.status === 'pending'
                                                ? 'bg-gray-400'
                                                : 'bg-green-400'
                                    }>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    {appliedJob?.paymentStatus ? (
                                        <Badge className={
                                            appliedJob.paymentStatus === "Paid"
                                                ? 'bg-green-400'
                                                : 'bg-yellow-400'
                                        }>
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
                                                <span className="ml-2 text-sm text-gray-400" style={{ paddingLeft: "20px" }}>
                                                    &quot;{appliedJob.rating.review}&quot;
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-gray-500">No Rating</span>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {appliedJob.feedback ? (
                                        <span className="text-sm text-gray-400">&quot;{appliedJob.feedback}&quot;</span>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <input
                                                type="text"
                                                value={feedbackInput[appliedJob._id] || ""}
                                                onChange={(e) => setFeedbackInput({
                                                    ...feedbackInput,
                                                    [appliedJob._id]: e.target.value
                                                })}
                                                placeholder="Write feedback..."
                                                className="px-2 py-1 text-sm border rounded"
                                            />
                                            <button
                                                onClick={() => handleFeedbackSubmit(appliedJob._id)}
                                                disabled={loadingFeedbackId === appliedJob._id}
                                                className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                                            >
                                                {loadingFeedbackId === appliedJob._id ? 'Submitting...' : 'Submit'}
                                            </button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
