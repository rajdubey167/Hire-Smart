import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import './BlogSection.css';

const BlogSection = () => {
  const location = useLocation();
  const isOnHomePage = location.pathname === '/';

  return (
    <>
      {!isOnHomePage && <Navbar />}
      <div className={!isOnHomePage ? 'blog-page' : ''}>
        <section className="blog-section">
          <div className="blog-container">
            <motion.div 
              className="blog-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Latest from Our Blog</h2>
              <p>Discover insights, tips, and industry news to help you succeed in your professional journey.</p>
            </motion.div>

            <div className="blog-grid">
              {/* Blog Card 1 */}
              <motion.article 
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Career Development" 
                  className="blog-card-image"
                />
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span>Career Development</span>
                    <span>5 min read</span>
                  </div>
                  <h3 className="blog-card-title">10 Tips for Career Advancement in 2024</h3>
                  <p className="blog-card-excerpt">
                    Learn the essential strategies to accelerate your career growth and achieve your professional goals.
                  </p>
                  <Link to="/blog/career-tips" className="blog-card-link">
                    Read More →
                  </Link>
                </div>
              </motion.article>

              {/* Blog Card 2 */}
              <motion.article 
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Industry Trends" 
                  className="blog-card-image"
                />
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span>Industry Trends</span>
                    <span>7 min read</span>
                  </div>
                  <h3 className="blog-card-title">Emerging Job Market Trends</h3>
                  <p className="blog-card-excerpt">
                    Stay ahead of the curve with our analysis of the latest job market trends and opportunities.
                  </p>
                  <Link to="/blog/market-trends" className="blog-card-link">
                    Read More →
                  </Link>
                </div>
              </motion.article>

              {/* Blog Card 3 */}
              <motion.article 
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Professional Skills" 
                  className="blog-card-image"
                />
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span>Professional Skills</span>
                    <span>6 min read</span>
                  </div>
                  <h3 className="blog-card-title">Essential Skills for the Digital Age</h3>
                  <p className="blog-card-excerpt">
                    Discover the must-have skills that will help you thrive in today's digital workplace.
                  </p>
                  <Link to="/blog/digital-skills" className="blog-card-link">
                    Read More →
                  </Link>
                </div>
              </motion.article>
            </div>

            <motion.div 
              className="blog-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link to="/blog" className="view-all-btn">
                View All Articles
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      {!isOnHomePage && <Footer />}
    </>
  );
};

export default BlogSection; 