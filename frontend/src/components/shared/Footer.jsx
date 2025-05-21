/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

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

// Footer Section Component
const FooterSection = ({ title, children, className = "" }) => {
  return (
    <motion.div 
      className={`footer-section ${className}`}
      variants={itemVariants}
    >
      <h3 className="footer-title">{title}</h3>
      {children}
    </motion.div>
  );
};

// Footer Links Component
const FooterLinks = ({ links }) => {
  const navigate = useNavigate();
  
  const handleLinkClick = (url) => {
    if (url === "/category") {
      navigate("/browse", { state: { scrollToCategories: true } });
    } else {
      navigate(url);
    }
  };
  
  return (
    <ul className="footer-links">
      {links.map((link, index) => (
        <motion.li 
          key={index}
          variants={itemVariants}
          whileHover={{ x: 5 }}
        >
          <a 
            href={link.url || "#"} 
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(link.url);
            }}
          >
            <span className="link-icon"><ArrowRight size={14} /></span>
            {link.text}
          </a>
        </motion.li>
      ))}
    </ul>
  );
};

// Contact Info Component
const ContactInfo = () => {
  return (
    <div className="contact-info">
      <motion.div className="contact-item" variants={itemVariants}>
        <div className="contact-icon">
          <MapPin size={18} />
        </div>
        <div className="contact-text">
          <p>D-202, 2nd Floor, Bandra East</p>
          <p>Mumbai, Maharashtra, India</p>
        </div>
      </motion.div>
      
      <motion.div className="contact-item" variants={itemVariants}>
        <div className="contact-icon">
          <Phone size={18} />
        </div>
        <div className="contact-text">
          <p>+91 9876543210</p>
        </div>
      </motion.div>
      
      <motion.div className="contact-item" variants={itemVariants}>
        <div className="contact-icon">
          <Mail size={18} />
        </div>
        <div className="contact-text">
          <p>info@hiresmart.com</p>
        </div>
      </motion.div>
    </div>
  );
};

// Social Links Component
const SocialLinks = () => {
  const socialLinks = [
    { icon: <Facebook size={18} />, url: "https://www.facebook.com/" },
    { icon: <Twitter size={18} />, url: "https://x.com/" },
    { icon: <Instagram size={18} />, url: "https://www.instagram.com/" },
    { icon: <Linkedin size={18} />, url: "https://www.linkedin.com/" }
  ];
  
  return (
    <div className="social-links">
      {socialLinks.map((social, index) => (
        <motion.a 
          key={index}
          href={social.url}
          className="social-icon"
          whileHover={{ y: -5, backgroundColor: "var(--primary-color)" }}
          whileTap={{ scale: 0.95 }}
        >
          {social.icon}
        </motion.a>
      ))}
    </div>
  );
};

// Newsletter Component
const Newsletter = () => {
  return (
    <div className="newsletter">
      <h4 className="newsletter-title">Subscribe to our newsletter</h4>
      <p className="newsletter-description">Get the latest updates and news directly in your inbox.</p>
      <form className="newsletter-form">
        <input 
          type="email" 
          placeholder="Your email address" 
          className="newsletter-input"
        />
        <motion.button 
          type="submit" 
          className="newsletter-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Subscribe
        </motion.button>
      </form>
    </div>
  );
};

// Main Footer Component
const Footer = () => {
  const quickLinks = [
    { text: "Home", url: "/" },
    { text: "Blog", url: "/blog" },
    { text: "Help Center", url: "/help" },
    { text: "Contact Us", url: "/contact" },
    { text: "About Us", url: "/about" }
  ];
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-content">
          <motion.div 
            className="footer-content-wrapper"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <FooterSection title="Hire Smart">
              <p className="footer-description">
                Connect with skilled professionals for all your home improvement and maintenance needs.
              </p>
              <ContactInfo />
              <SocialLinks />
            </FooterSection>
            
            <FooterSection title="Quick Links">
              <FooterLinks links={quickLinks} />
            </FooterSection>
            
            <FooterSection title="Newsletter">
              <Newsletter />
            </FooterSection>
          </motion.div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Hire Smart. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 