import React, { useState } from 'react';
import styles from '../component.module.css';

function DisplayCallToAction() {
  const [isDayMode] = useState(true); // Dummy data
  const classes = isDayMode ? styles.bgStone500 : styles.bgStone600;

  return (
    <div className={`${classes} text-white hover:text-gray-300 px-4 py-2 rounded cursor-pointer`}>
      Contact
    </div>
  );
}

export default DisplayCallToAction;
