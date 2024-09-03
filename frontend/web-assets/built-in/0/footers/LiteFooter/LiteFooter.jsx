import React from 'react';
import styles from './LiteFooter.module.css';

function LiteFooter(props) {
  const { system, user } = props.data;
  const {
    isDisplayMode,
    isFunctionalMode,
    isDayMode,
  } = system.state;

  const renderTextColorClass = (value) => {
    switch (value) {
      case "LIGHT":
        return styles.textLight;
      case "DARK":
        return styles.textDark;
      default:
        return styles.textDark;
    }
  };

  const textClass = renderTextColorClass(
    isDayMode
      ? user?.copyrightColorDay?.value?.suggestedTextColor
      : user?.copyrightColorNight?.value?.suggestedTextColor
  );

  const backgroundColorClass = isDayMode ? styles.bgDay : styles.bgNight;

  return (
    <>
      {isDisplayMode && (
        <div className={`${styles.copyright} ${backgroundColorClass}`}>
          &copy; 2023 Your Company. All rights reserved.
        </div>
      )}
      {isFunctionalMode && user.isCopyrightShowing.value && (
        <div
          className={`${styles.copyright} ${textClass}`}
          style={{
            background: isDayMode
              ? user?.copyrightColorDay?.value?.color
              : user?.copyrightColorNight?.value?.color,
          }}
        >
          &copy; 2023 {user?.copyrightName?.value || "Your Brand"}. All rights reserved.
        </div>
      )}
    </>
  );
}

export default LiteFooter;
