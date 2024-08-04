import React from 'react';
import styles from '../component.module.css';

function DisplayFooter(props) {
  const { system } = props.data;
  const { isDayMode } = system.state;

  const textClasses = isDayMode ? styles.textDay : styles.textNight;

  return (
    <footer className={`${styles.footer} ${textClasses} ${styles.textNight}`}>
      <div className={styles.footerContent}>
        <div className={styles.resourceListRow}>
          <div className={styles.resourceList}>
            <p className={styles.header}>Header</p>
            <a href="#" className={`${textClasses} ${styles.textNight}`}>Link</a>
            <a href="#" className={`${textClasses} ${styles.textNight}`}>Link</a>
          </div>
          <div className={styles.resourceList}>
            <p className={styles.header}>Header</p>
            <a href="#" className={`${textClasses} ${styles.textNight}`}>Link</a>
            <a href="#" className={`${textClasses} ${styles.textNight}`}>Link</a>
          </div>
          <div className={styles.resourceList}>
            <p className={styles.header}>Header</p>
            <a href="#" className={`${textClasses} ${styles.textNight}`}>Link</a>
            <a href="#" className={`${textClasses} ${styles.textNight}`}>Link</a>
          </div>
          <div className={styles.resourceList}>
            <p className={styles.header}>Header</p>
            <a href="#" className={`${textClasses} ${styles.textNight}`}>Link</a>
            <a href="#" className={`${textClasses} ${styles.textNight}`}>Link</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DisplayFooter;
