import React from 'react';
import styles from './LinkCollectionFooter.module.css';

function LinkCollectionFooter(props) {
  const { system, user } = props.data;
  const { isDisplayMode, isFunctionalMode, isDayMode } = system.state;

  const renderTextColorClass = (mode) => (mode === "LIGHT" ? styles.textLight : styles.textDark);
  
  const textClass = renderTextColorClass(
    isDayMode
      ? user?.colorFooterDay?.suggestedTextColor
      : user?.colorFooterNight?.suggestedTextColor
  );

  const backgroundColorClass = isDayMode ? styles.bgLight : styles.bgDark;

  return (
    <>
      {isDisplayMode && (
        <footer className={`${styles.footer} ${backgroundColorClass}`}>
          <div className={styles.resourceListRow}>
            <div className={styles.resourceList}>
              <p className={styles.header}>Header</p>
              <a href="javascript:void(0)">Link</a>
              <a href="javascript:void(0)">Link</a>
            </div>
            <div className={styles.resourceList}>
              <p className={styles.header}>Header</p>
              <a href="javascript:void(0)">Link</a>
              <a href="javascript:void(0)">Link</a>
            </div>
            <div className={styles.resourceList}>
              <p className={styles.header}>Header</p>
              <a href="javascript:void(0)">Link</a>
              <a href="javascript:void(0)">Link</a>
            </div>
            <div className={styles.resourceList}>
              <p className={styles.header}>Header</p>
              <a href="javascript:void(0)">Link</a>
              <a href="javascript:void(0)">Link</a>
            </div>
          </div>
          <div className={`${styles.copyright}`}>
            &copy; 2023 Your Company. All rights reserved.
          </div>
        </footer>
      )}
      {isFunctionalMode && user.isFooterShowing && (
        <footer className={`${styles.footer} ${textClass}`} style={{ background: isDayMode ? user.colorFooterDay?.color : user.colorFooterNight?.color }}>
          <div className={styles.resourceListRow}>
            <div className={styles.resourceList}>
              <p className={styles.header}>Header</p>
              <a href="#" className={textClass}>Link</a>
              <a href="#" className={textClass}>Link</a>
            </div>
            <div className={styles.resourceList}>
              <p className={styles.header}>Header</p>
              <a href="#" className={textClass}>Link</a>
              <a href="#" className={textClass}>Link</a>
            </div>
            <div className={styles.resourceList}>
              <p className={styles.header}>Header</p>
              <a href="#" className={textClass}>Link</a>
              <a href="#" className={textClass}>Link</a>
            </div>
            <div className={styles.resourceList}>
              <p className={styles.header}>Header</p>
              <a href="#" className={textClass}>Link</a>
              <a href="#" className={textClass}>Link</a>
            </div>
          </div>
          {user.isCopyrightShowing && (
            <div className={`${styles.copyright} ${textClass}`} style={{ background: isDayMode ? user.copyrightColorDay?.color : user.copyrightColorNight?.color }}>
              &copy; 2023 {user.copyrightName || "Your Brand"}. All rights reserved.
            </div>
          )}
        </footer>
      )}
    </>
  );
}

export default LinkCollectionFooter;
