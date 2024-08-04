import React from 'react';
import styles from '../component.module.css';

const FunctionalCopyright = (props) => {
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

  const textClass = renderSuggestedTextColorClass(
    isDayMode ? user.copyrightColorDay?.suggestedTextColor : user.copyrightColorNight?.suggestedTextColor
  );

  return (
    <div>
      {user.isCopyrightShowing && (
        <div className={`${styles.copyright} ${textClass}`} style={{
          background: isDayMode ? user.copyrightColorDay?.color : user.copyrightColorNight?.color
        }}>
          &copy; 2023 {user.copyrightName || "Your Brand"}. All rights reserved.
        </div>
      )}
    </div>
  );
};

export default FunctionalCopyright;
