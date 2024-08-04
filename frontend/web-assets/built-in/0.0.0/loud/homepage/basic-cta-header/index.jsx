import React from 'react';
import styles from './component.module.css';

const MainVideoHeader = (props) => {
  const { system } = props.data;
  const { isNightMode } = system.state;

  return (
    <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
      <div className={`${styles.overlay} ${isNightMode ? styles.overlayNight : ''}`}></div>
      <div className={styles.content}>
        <h1 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>
          Empower Your Small Business
        </h1>
        <p className={`${styles.subheading} ${isNightMode ? styles.subheadingNight : ''}`}>
          Unlock success with tailored solutions and expert guidance.
        </p>
        <a
          href="#cta" // Replace with your desired link
          className={`${styles.ctaButton} ${isNightMode ? styles.ctaButtonNight : ''}`}
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default MainVideoHeader;
