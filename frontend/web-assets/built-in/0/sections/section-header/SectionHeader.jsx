import React from 'react';
import styles from './SectionHeader.module.css';

const SectionHeader = (props) => {
  const { system } = props.data;
  const { isNightMode } = system.state;
  
  return (
    <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
      <div className={styles.container}>
        <h2 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>
          Discover Exciting Opportunities with Us
        </h2>
      </div>
    </section>
  );
};

export default SectionHeader;
