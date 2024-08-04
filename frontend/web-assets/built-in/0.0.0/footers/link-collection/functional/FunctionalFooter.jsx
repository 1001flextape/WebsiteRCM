import React from 'react';
import styles from '../component.module.css';

function FunctionalFooter(props) {
  const { system, user } = props.data;
  const { isDayMode } = system.state;

  const renderSuggestedTextColorClass = (value) => {
    switch (value) {
      case "LIGHT":
        return styles.textDay;
      case "DARK":
        return styles.textNight;
      default:
        return styles.textNight;
    }
  }

  const textClasses = renderSuggestedTextColorClass(
    isDayMode ? user.colorFooterDay?.suggestedTextColor : user.colorFooterNight?.suggestedTextColor
  );

  return (
    <>
      {user.isFooterShowing && (
        <footer className={`${styles.footer} ${textClasses}`} style={{
          background: isDayMode ? user.colorFooterDay?.color : user.colorFooterNight?.color
        }}>
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
        </footer>
      )}
    </>
  );
}

export default FunctionalFooter;
