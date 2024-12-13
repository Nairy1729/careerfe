import React from "react";
import './Footer.css';
import { FaGithub, FaTwitter, FaLinkedin,FaMedium  } from "react-icons/fa"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Career Crafter | All Rights Reserved</p>
        
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a> | 
          <a href="/terms-of-service">Terms of Service</a>
        </div>

        <div className="social-links">
          <a 
            href="https://github.com/nairy1729" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub"
            className="social-icon"
          >
            <FaGithub />
          </a>
          <a 
            href="https://twitter.com/fourierzz" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Twitter"
            className="social-icon"
          >
            <FaTwitter />
          </a>
          <a 
            href="https://linkedin.com/in/nairykumar" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
            className="social-icon"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://medium.com/@narendra.kumarvg2" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Medium"
            className="social-icon"
          >
            <FaMedium />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
