import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { useLocation } from 'react-router-dom';
import './Contact.css';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_h4klrss'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_qtltrbl'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = '3DiwmVuIOTJ1fFCcm'; // Replace with your EmailJS public key

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

// Form Input Component
const FormInput = ({ label, id, name, type = "text", value, onChange, required = true, rows }) => {
  return (
    <motion.div 
      className="form-group"
      variants={itemVariants}
    >
      <label htmlFor={id}>{label}</label>
      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          required={required}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </motion.div>
  );
};

// Contact Form Component
const ContactForm = ({ formData, handleChange, handleSubmit, status, isSubmitting }) => {
  return (
    <motion.div 
      className="contact-form-wrapper"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-badge">
        <Mail size={16} />
        <span>Contact Us</span>
      </div>
      <h2 className="section-title">Get In Touch</h2>
      <p className="contact-subtitle">Have questions? Want to sign up? Send us a message and we'll respond shortly.</p>
      
      <motion.form 
        className="contact-form" 
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="form-row">
          <FormInput 
            label="First Name" 
            id="firstName" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
          />
          <FormInput 
            label="Last Name" 
            id="lastName" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
          />
        </div>
        
        <FormInput 
          label="Email" 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        
        <FormInput 
          label="Message" 
          id="message" 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          rows={5} 
        />
        
        {status.message && (
          <motion.div 
            className={`status-message ${status.type}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{status.message}</span>
          </motion.div>
        )}
        
        <motion.button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

// Office Info Component
const OfficeInfo = () => {
  return (
    <motion.div 
      className="office-info"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-badge">
        <MapPin size={16} />
        <span>Our Location</span>
      </div>
      <h2 className="section-title">Visit Our Office</h2>
      
      <motion.div 
        className="office-details"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="detail-item" variants={itemVariants}>
          <div className="detail-icon">
            <MapPin size={20} />
          </div>
          <div className="detail-content">
            <h3 className="detail-title">Address</h3>
            <p>D-202, 2nd Floor, Bandra East</p>
            <p>Mumbai, Maharashtra, India</p>
          </div>
        </motion.div>
        
        <motion.div className="detail-item" variants={itemVariants}>
          <div className="detail-icon">
            <Phone size={20} />
          </div>
          <div className="detail-content">
            <h3 className="detail-title">Phone</h3>
            <p>+91 9876543210</p>
          </div>
        </motion.div>
        
        <motion.div className="detail-item" variants={itemVariants}>
          <div className="detail-icon">
            <Mail size={20} />
          </div>
          <div className="detail-content">
            <h3 className="detail-title">Email</h3>
            <p>info@hiresmart.com</p>
          </div>
        </motion.div>
        
        <motion.div className="detail-item" variants={itemVariants}>
          <div className="detail-icon">
            <Clock size={20} />
          </div>
          <div className="detail-content">
            <h3 className="detail-title">Business Hours</h3>
            <p>Monday - Friday: 9AM - 6PM</p>
            <p>Saturday: 10AM - 4PM</p>
            <p>Sunday: Closed</p>
          </div>
        </motion.div>
        
        <motion.div className="social-links" variants={itemVariants}>
          <h3 className="detail-title">Follow Us</h3>
          <div className="social-icons">
            <motion.a 
              href="https://www.facebook.com/hiresmart" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFacebookF />
            </motion.a>
            <motion.a 
              href="https://twitter.com/hiresmart" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTwitter />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/hiresmart" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInstagram />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/company/hiresmart" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedinIn />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  
  // Check if the component is being rendered on the Home page
  const isOnHomePage = location.pathname === '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString(),
          to_email: 'sahilkumargupta0018@gmail.com'
        },
        EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! We will get back to you soon.'
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {!isOnHomePage && <Navbar />}
      <section className="contact-section">
        <div className="contact-container">
          <ContactForm 
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            status={status}
            isSubmitting={isSubmitting}
          />
          <OfficeInfo />
        </div>
      </section>
      {!isOnHomePage && <Footer />}
    </div>
  );
};

export default Contact; 