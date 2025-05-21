import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import Footer from '../shared/Footer'
import Navbar from '../shared/Navbar'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-end my-5'>
          <Button 
            onClick={() => navigate("/admin/jobs/create")}
            className="text-white bg-blue-600 hover:bg-blue-700"
          > 
            Post New Job 
          </Button>
        </div>
        <AdminJobsTable />
      </div>
      <Footer />
    </div>
  )
}

export default AdminJobs