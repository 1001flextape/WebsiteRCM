import React from 'react';
import styles from '../component.module.css';

const FunctionalCopyright = (props) => {
  const { system, user } = props.data;
  const { isDayMode } = system.state;

  const textClass = isDayMode
    ? styles.textDay
    : styles.textNight;

  return (
    <div>
      {user.isCopyrightShowing && (
        <div
          className={`${styles.copyright} ${textClass}`}
          style={{
            background: isDayMode
              ? user.copyrightColorDay?.color
              : user.copyrightColorNight?.color,
          }}
        >
          &copy; 2023 {user.copyrightName || 'Your Brand'}. All rights reserved.
        </div>
      )}
    </div>
  );
};

export default FunctionalCopyright;
