import React from 'react';
import FunctionalBranding from './FunctionalBranding';
import styles from '../component.module.css';

function FunctionalFooter(props) {
  const { system, user } = props.data;
  const { isDayMode } = system.state;

  const textClasses = isDayMode ? styles.textDay : styles.textNight;

  return (
    <>
      {user.isFooterShowing && (
        <footer
          className={`${styles.footer} ${textClasses}`}
          style={{
            background: isDayMode
              ? user.colorFooterDay?.color
              : user.colorFooterNight?.color,
          }}
        >
          <div className={styles.footerContent}>
            <FunctionalBranding {...props} />
            <div className={styles.resourceListRow}>
              <div className={styles.resourceList}>
                <p className={styles.header}>Header</p>
                <a href="#" className={textClasses}>Link</a>
                <a href="#" className={textClasses}>Link</a>
              </div>
              <div className={styles.resourceList}>
                <p className={styles.header}>Header</p>
                <a href="#" className={textClasses}>Link</a>
                <a href="#" className={textClasses}>Link</a>
              </div>
              <div className={styles.resourceList}>
                <p className={styles.header}>Header</p>
                <a href="#" className={textClasses}>Link</a>
                <a href="#" className={textClasses}>Link</a>
              </div>
              <div className={styles.resourceList}>
                <p className={styles.header}>Header</p>
                <a href="#" className={textClasses}>Link</a>
                <a href="#" className={textClasses}>Link</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

export default FunctionalFooter;
