import React from 'react';
import styles from '../component.module.css';

const DisplayCopyright = (props) => {
  const { system } = props.data;
  const { isDayMode } = system.state;

  const backgroundColorClass = isDayMode ? styles.bgDay : styles.bgNight;
  const textColorClass = isDayMode ? styles.textDay : styles.textNight;

  return (
    <div className={`${styles.copyright} ${backgroundColorClass} ${textColorClass}`}>
      &copy; 2023 Your Company. All rights reserved.
    </div>
  );
};

export default DisplayCopyright;
