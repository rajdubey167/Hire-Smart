import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { motion } from 'framer-motion';

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container px-4 py-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="mb-8 text-4xl font-bold text-center text-gray-900">Help Center</h1>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Quick Start Guide */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">Quick Start Guide</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Create your professional profile</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Browse available job listings</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Apply for positions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Track your applications</span>
                </li>
              </ul>
            </div>

            {/* FAQs */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">How do I create an account?</h3>
                  <p className="mt-1 text-gray-600">Click the &quot;Sign Up&quot; button and follow the registration process with your email.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">How can I update my profile?</h3>
                  <p className="mt-1 text-gray-600">Navigate to your profile page and click the &quot;Edit Profile&quot; button.</p>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">Contact Support</h2>
              <p className="mb-4 text-gray-600">Need additional help? Our support team is here for you.</p>
              <button className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700">
                Contact Us
              </button>
            </div>

            {/* Resources */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">Resources</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>User Guides</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Video Tutorials</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Best Practices</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpCenter; 