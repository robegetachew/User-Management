import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
const Footer = () => {

  return (
    <footer className="footer">
      <div className="copyright">
        <p>&copy;Copyright - Ethiopian Artificial Intelligence Institute</p>
      </div>
    </footer>
  );
};

export default Footer;