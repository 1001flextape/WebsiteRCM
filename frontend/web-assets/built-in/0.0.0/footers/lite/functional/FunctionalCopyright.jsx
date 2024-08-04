import React from 'react';
import styles from '../component.module.css';

const FunctionalCopyright = (props) => {
  const { system, user } = props.data;
  const { isDayMode, isNightMode } = system.state;

  const renderSuggestedTextColorClass = (value) => {
    switch (value) {
      case "LIGHT":
        return styles.textLight;
      case "DARK":
        return styles.textDark;
      default:
        return styles.textDark;
    }
  };

  const textClass = renderSuggestedTextColorClass(
    isDayMode
      ? user.copyrightColorDay?.suggestedTextColor
      : user.copyrightColorNight?.suggestedTextColor
  );

  return (
    <div>
      {user.isCopyrightShowing && (
        <div
          className={`${styles.textCenter} ${styles.py8} ${textClass}`}
          style={{
            background: isDayMode
              ? user.copyrightColorDay?.color
              : user.copyrightColorNight?.color,
          }}
        >
          &copy; 2023 {user.copyrightName || "Your Brand"}. All rights reserved.
        </div>
      )}
    </div>
  );
};

export default FunctionalCopyright;
