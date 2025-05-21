import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import Footer from '../shared/Footer'
import { Plus } from 'lucide-react'
import Navbar from '../shared/Navbar'



const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-end my-5'>
                    <Button 
                        onClick={() => navigate("/admin/companies/create")}
                        className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus size={16} />
                        Add Company
                    </Button>
                </div>
                <CompaniesTable/>
            </div>
            <Footer/>
        </div>
    )
}

export default Companies