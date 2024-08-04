import React from 'react';
import styles from '../component.module.css';

const DisplayCopyright = (props) => {
  const { system } = props.data;
  const { isDayMode, isNightMode } = system.state;

  const backgroundColorClass = isDayMode ? styles.bgStone400 : styles.bgStone700;
  const backgroundColorTextClass = isDayMode ? styles.textGray800 : styles.textGray200;

  return (
    <div>
      <div className={`${styles.textCenter} ${styles.py8} ${backgroundColorClass} ${backgroundColorTextClass}`}>
        &copy; 2023 Your Company. All rights reserved.
      </div>
    </div>
  );
};

export default DisplayCopyright;
