import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Clock, Shield } from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import './AboutUs.css';

const AboutUs = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      bio: "With over 15 years in the construction industry, Sarah founded Hire Smart to revolutionize how homeowners connect with skilled professionals."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      bio: "Michael brings his tech expertise to ensure Hire Smart's platform is cutting-edge and user-friendly."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      bio: "Emily oversees the day-to-day operations, ensuring smooth service delivery and customer satisfaction."
    },
    {
      name: "David Kim",
      role: "Head of Marketing",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      bio: "David leads our marketing efforts to connect with homeowners and professionals across the country."
    }
  ];

  // Values data
  const values = [
    {
      icon: <Users size={40} />,
      title: "Community First",
      description: "We believe in building a strong community of trusted professionals and satisfied homeowners."
    },
    {
      icon: <Target size={40} />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, from platform design to customer support."
    },
    {
      icon: <Award size={40} />,
      title: "Quality",
      description: "We maintain high standards for all professionals on our platform to ensure top-notch service."
    },
    {
      icon: <Heart size={40} />,
      title: "Integrity",
      description: "We operate with transparency and honesty in all our business dealings."
    },
    {
      icon: <Clock size={40} />,
      title: "Efficiency",
      description: "We value your time and work to make the hiring process as quick and easy as possible."
    },
    {
      icon: <Shield size={40} />,
      title: "Trust",
      description: "We build trust through verified reviews, background checks, and secure payment systems."
    }
  ];

  return (
    <div className="about-us-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <motion.h1 
            className="about-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Hire Smart
          </motion.h1>
          <motion.p 
            className="about-subtitle"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connecting homeowners with skilled professionals since 2020
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <motion.div 
            className="mission-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="mission-text" variants={itemVariants}>
              <h2>Our Mission</h2>
              <p>
                At Hire Smart, our mission is to simplify the process of finding reliable home improvement and maintenance professionals. 
                We believe that everyone deserves access to quality home services without the hassle of endless searching and uncertainty.
              </p>
              <p>
                By creating a trusted platform that connects homeowners with verified professionals, we&apos;re transforming the way people 
                approach home projects, big and small.
              </p>
            </motion.div>
            <motion.div className="mission-image" variants={itemVariants}>
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Team collaboration" 
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h2>
          <motion.div 
            className="values-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="value-card"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>
          <motion.div 
            className="team-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                className="team-card"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              >
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div 
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="stat-card" variants={itemVariants}>
              <h3>10,000+</h3>
              <p>Verified Professionals</p>
            </motion.div>
            <motion.div className="stat-card" variants={itemVariants}>
              <h3>50,000+</h3>
              <p>Completed Projects</p>
            </motion.div>
            <motion.div className="stat-card" variants={itemVariants}>
              <h3>4.8/5</h3>
              <p>Average Rating</p>
            </motion.div>
            <motion.div className="stat-card" variants={itemVariants}>
              <h3>100+</h3>
              <p>Cities Served</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <motion.div 
            className="about-cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to get started?</h2>
            <p>Join thousands of homeowners who trust Hire Smart for their home improvement needs.</p>
            <div className="about-cta-buttons">
              <button className="primary-button">Find a Professional</button>
              <button className="secondary-button">Join as a Professional</button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs; 