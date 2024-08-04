import React from 'react';
import styles from './component.module.css';

const JournalSection = (props) => {
  const { system } = props.data;
  const { isNightMode } = system.state;

  return (
    <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
      <div className={styles.container}>
        <h3 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>
          Explore Current Trends with Us
        </h3>
        <p className={`${styles.text} ${isNightMode ? styles.textNight : ''}`}>
          Explore a diverse range of content thoughtfully curated for you. Our hub is designed to offer valuable insights and keep you informed. Discover opportunities as you navigate through our content and stay updated on the latest trends without any noise.
        </p>
      </div>
    </section>
  );
};

export default JournalSection;
