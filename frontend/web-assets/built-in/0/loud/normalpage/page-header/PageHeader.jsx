import React from 'react';
import styles from './PageHeader.module.css';

const PageHeader = (props) => {
  const { system } = props.data;
  const { isNightMode } = system.state;

  return (
    <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
      <div className={styles.container}>
        <h1 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>
          Ignite Your Journey with Innovative Solutions
        </h1>
      </div>
    </section>
  );
};

export default PageHeader;
