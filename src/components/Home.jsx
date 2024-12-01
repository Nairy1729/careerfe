import React from "react";
import './Home.css';
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Career Crafter</h1>
          <p>Your guide to building a successful and fulfilling career.</p>
          <button onClick={() => navigate("/login")}>Get Started</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>What We Offer</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Career Guidance</h3>
            <p>Personalized career advice to help you find the right path.</p>
          </div>
          <div className="service-card">
            <h3>Job Listings</h3>
            <p>Browse curated job opportunities that match your skills.</p>
          </div>
          <div className="service-card">
            <h3>Resume & Interview Tips</h3>
            <p>Learn how to craft a resume and ace interviews.</p>
          </div>
          <div className="service-card">
            <h3>Skill Development</h3>
            <p>Access online courses and resources to grow your skills.</p>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-jobs-section">
        <h2>Featured Job Categories</h2>
        <div className="job-categories">
          <div className="job-category">
            <h3>Technology</h3>
          </div>
          <div className="job-category">
            <h3>Marketing</h3>
          </div>
          <div className="job-category">
            <h3>Sales</h3>
          </div>
          <div className="job-category">
            <h3>Finance</h3>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories-section">
        <h2>Success Stories</h2>
        <div className="story-cards">
          <div className="story-card">
            <p>"Career Crafter helped me transition into tech. I’m now a software engineer!"</p>
            <strong>- Sarah M.</strong>
          </div>
          <div className="story-card">
            <p>"I landed my dream job thanks to the career guidance I received."</p>
            <strong>- David L.</strong>
          </div>
        </div>
      </section>


    </main>
  );
};

export default Home;
