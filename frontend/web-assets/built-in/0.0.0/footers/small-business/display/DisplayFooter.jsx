import React from 'react';
import DisplayBranding from './DisplayBranding';
import DisplayCopyright from './DisplayCopyright';
import DisplayCta from './DisplayCta';
import styles from '../component.module.css';

function DisplayFooter(props) {
  const { system } = props.data;
  const { isDayMode } = system.state;

  const textClasses = isDayMode ? styles.textDay : styles.textNight;

  return (
    <footer className={`${styles.footer} ${textClasses} ${styles.textDay}`}>
      <div className={styles.footerContent}>
        <DisplayBranding {...props} />
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
