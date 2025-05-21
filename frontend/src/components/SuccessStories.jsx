/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, ArrowRight } from 'lucide-react';
import './SuccessStories.css';

// Animation variants for staggered animations
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

// Story Card Component
const StoryCard = ({ story }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "rgb(99, 102, 241)"
      }}
      whileTap={{ scale: 0.98 }}
      className="story-card"
    >
      <div className="story-image">
        <img src={story.image} alt={story.title} />
        <div className="story-image-overlay"></div>
        <div className="story-rating">
          <Star size={16} fill="currentColor" />
          <span>5.0</span>
        </div>
      </div>
      <div className="story-content">
        <div className="story-category">Home Improvement</div>
        <h3 className="story-title">{story.title}</h3>
        <div className="story-quote-container">
          <Quote className="quote-icon" size={24} />
          <p className="quote">{story.quote}</p>
        </div>
        <div className="story-footer">
          <div className="client-info">
            <div className="client-avatar">
              {story.client.charAt(0)}
            </div>
            <div>
              <p className="client-name">{story.client}</p>
              <p className="client-location">New York, USA</p>
            </div>
          </div>
          <a href={story.readMoreLink} className="read-more">
            Read More <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Section Header Component
const SectionHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="section-header"
    >
      <div className="section-badge">
        <Star size={16} fill="currentColor" />
        <span>Success Stories</span>
      </div>
      <h2 className="section-title">Real Stories from Our Community</h2>
      <p className="section-description">
        Discover how our platform has helped people find the perfect workers for their projects
      </p>
    </motion.div>
  );
};

// Slider Controls Component
const SliderControls = ({ onPrevClick, onNextClick }) => {
  return (
    <div className="slider-controls">
      <motion.button 
        className="slider-arrow prev" 
        onClick={onPrevClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={24} />
      </motion.button>
      <motion.button 
        className="slider-arrow next" 
        onClick={onNextClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={24} />
      </motion.button>
    </div>
  );
};

const SuccessStories = () => {
  const storiesRef = useRef(null);

  const scrollLeft = () => {
    if (storiesRef.current) {
      storiesRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (storiesRef.current) {
      storiesRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  const stories = [
    {
      id: 1,
      title: 'Home Renovation Success',
      client: 'Maria Rodriguez',
      quote: '"Found an amazing team of contractors through Hire Smart that completely transformed my outdated kitchen into a modern masterpiece!"',
      readMoreLink: '#',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
    },
    {
      id: 2,
      title: 'Emergency Plumbing Fix',
      client: 'James Wilson',
      quote: '"Had a midnight plumbing emergency and was connected with a professional plumber within an hour! Saved me from a potential disaster."',
      readMoreLink: '#',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
    },
    {
      id: 3,
      title: 'Landscape Transformation',
      client: 'Linda Thompson',
      quote: '"The landscaping team I found through Hire Smart turned our barren backyard into a beautiful oasis. Highly recommended!"',
      readMoreLink: '#',
      image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
    },
    {
      id: 4,
      title: 'Stunning Bathroom Remodel',
      client: 'Robert Johnson',
      quote: '"The bathroom renovation exceeded all my expectations. The contractors were professional, completed on time and the results are gorgeous."',
      readMoreLink: '#',
      image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
    }
  ];

  return (
    <section className="success-stories">
      <div className="container">
        <SectionHeader />
      </div>
      
      <motion.div 
        className="stories-grid" 
        ref={storiesRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </motion.div>
      
      <div className="container">
        <SliderControls onPrevClick={scrollLeft} onNextClick={scrollRight} />
      </div>
    </section>
  );
};

export default SuccessStories;