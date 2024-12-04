import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to CareerCrafter</h1>
          <p>The ultimate platform for connecting talent with opportunity. Empowering employers and job seekers alike to achieve their goals.</p>
          <button onClick={() => navigate("/login")}>Explore Opportunities</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Core Features</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>For Employers</h3>
            <p>Create and manage job listings seamlessly. Access a diverse pool of qualified candidates.</p>
          </div>
          <div className="service-card">
            <h3>For Job Seekers</h3>
            <p>Discover job opportunities tailored to your skills and career aspirations. Apply and track applications with ease.</p>
          </div>
          <div className="service-card">
            <h3>Resume Database</h3>
            <p>Store and share your resumes securely, enabling effortless interactions with employers.</p>
          </div>
          <div className="service-card">
            <h3>Career Insights</h3>
            <p>Access expert guidance, interview tips, and resources to accelerate your professional journey.</p>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-jobs-section">
        <h2>Explore Job Categories</h2>
        <div className="job-categories">
          <div className="job-category">
            <h3>Information Technology</h3>
            <p>Opportunities in software development, data analysis, and more.</p>
          </div>
          <div className="job-category">
            <h3>Marketing & Sales</h3>
            <p>Jobs in digital marketing, brand management, and client relations.</p>
          </div>
          <div className="job-category">
            <h3>Finance & Accounting</h3>
            <p>Roles in financial analysis, accounting, and investment management.</p>
          </div>
          <div className="job-category">
            <h3>Healthcare</h3>
            <p>Careers in healthcare management, medical practice, and support services.</p>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories-section">
        <h2>Success Stories</h2>
        <div className="story-cards">
          <div className="story-card">
            <p>"CareerCrafter's intuitive platform helped me find the right candidates for my startup. Highly recommend!"</p>
            <strong>- Anjali R., HR Manager</strong>
          </div>
          <div className="story-card">
            <p>"I landed my dream job in tech within weeks of joining CareerCrafter. The process was seamless and efficient."</p>
            <strong>- Rahul K., Software Developer</strong>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
