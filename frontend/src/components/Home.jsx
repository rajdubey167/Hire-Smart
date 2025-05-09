import { useEffect } from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import StudentsList from './StudentsList'
import "./home.css"
import Chatbot from './Chatbot'
import SuccessStories from './SuccessStories'
import BlogSection from './BlogSection'
import Contact from './Contact'
import Navbar from './shared/Navbar'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className='homeDiv'>
        <HeroSection />
        <Chatbot />
        <CategoryCarousel />
        <StudentsList />
        <SuccessStories />
        <BlogSection />
        <LatestJobs />
        <Contact />
      </div>
      <Footer />
    </div>
  )
}

export default Home