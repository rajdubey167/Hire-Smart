import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AcceptedApplicationsTable from './components/admin/AcceptedApplicationsTable';
import PaymentSuccess from './components/admin/PaymentSuccess';
import StudentsList from './components/StudentsList';
import AboutUs from './pages/AboutUs';
import Contact from './components/Contact';
import BlogSection from './components/BlogSection';
import HelpCenter from './pages/HelpCenter';

const appRouter = createHashRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    )
  },
  {
    path: '/login',
    element: (
      <MainLayout>
        <Login />
      </MainLayout>
    )
  },
  {
    path: '/signup',
    element: (
      <MainLayout>
        <Signup />
      </MainLayout>
    )
  },
  {
    path: "/jobs",
    element: (
      <MainLayout>
        <Jobs />
      </MainLayout>
    )
  },
  {
    path: "/description/:id",
    element: (
      <MainLayout>
        <JobDescription />
      </MainLayout>
    )
  },
  {
    path: "/browse",
    element: (
      <MainLayout>
        <Browse />
      </MainLayout>
    )
  },
  {
    path: "/profile",
    element: (
      <MainLayout>
        <Profile />
      </MainLayout>
    )
  },
  {
    path: "/students",
    element: (
      <MainLayout>
        <StudentsList />
      </MainLayout>
    )
  },
  {
    path: "/about",
    element: <AboutUs />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/blog",
    element: <BlogSection />
  },
  {
    path: "/help",
    element: <HelpCenter />
  },
  // Admin routes
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Companies />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <CompanyCreate />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <CompanySetup />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <AdminJobs />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <PostJob />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Applicants />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/accepted",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <AcceptedApplicationsTable />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/payment-success/:applicationId",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <PaymentSuccess />
        </MainLayout>
      </ProtectedRoute>
    )
  }
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
