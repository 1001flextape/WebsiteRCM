import React from 'react';
import styles from '../component.module.css';

function DisplayCta(props) {
  const { system } = props.data;
  const { isDayMode } = system.state;

  const textClass = isDayMode ? styles.textDay : styles.textNight;

  return (
    <div className={`${styles.ctaPanel} ${textClass}`}>
      <h2 className={styles.ctaHeading}>Contact Us Today</h2>
      <p className={styles.ctaText}>
        Have questions or need assistance? We're here to help. Contact us for more information.
      </p>
      <a href="/contact" className={styles.ctaButton}>
        Get in Touch
      </a>
    </div>
  );
}

export default DisplayCta;
