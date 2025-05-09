import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (user) {
      navigate(`/description/${job._id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group p-6 rounded-lg shadow-md bg-white border border-[#e1e1e1] cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:border-[#5f5fff]"
    >
      <div>
        <h1 className="font-semibold text-xl text-gray-800 group-hover:text-[#5f5fff] transition-colors duration-200">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      <div className="mt-3">
        <h2 className="mb-1 text-2xl font-extrabold text-gray-900">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <span className="px-4 py-1 text-sm font-medium rounded-full bg-[#f9f9f9] text-gray-700 border border-[#e1e1e1]">
          Deadline: {job?.position} days
        </span>
        <span className="px-4 py-1 text-sm font-medium rounded-full bg-[#f9f9f9] text-[#F83002] border border-[#F83002]/40">
          {job?.jobType}
        </span>
        <span className="px-4 py-1 text-sm font-medium rounded-full bg-[#f9f9f9] text-[#7209b7] border border-[#7209b7]/30">
          {job?.salary} Per/Hr
        </span>
      </div>
    </div>
  );
};

export default LatestJobCards;
