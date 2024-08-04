import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import styles from '../component.module.css';

function FunctionalBranding() {
  return (
    <div className={styles.branding}>
      <HomeIcon className={styles.icon} />
      <p className={styles.text}>Company Name</p>
      <div className={styles.socialMedia}>
        <a href="#" className={styles.icon}>
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className={styles.icon}>
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className={styles.icon}>
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className={styles.icon}>
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      <div className={styles.contactInfo}>
        <p>(123) 456-7890</p>
        <p>info@example.com</p>
        <p>123 Street, City, Country</p>
      </div>
    </div>
  );
}

export default FunctionalBranding;
