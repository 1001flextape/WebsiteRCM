import React, { useState } from 'react';
import styles from '../component.module.css';

function DisplayLinksDesktop() {
  const [isDayMode] = useState(true); // Dummy data
  const classes = isDayMode ? styles.textGray800 : styles.textGray200;

  return (
    <div className={styles.navbarLinksDesktop}>
      <a href="#" className={classes}>
        About
      </a>
      <a href="#" className={classes}>
        Services
      </a>
    </div>
  );
}

export default DisplayLinksDesktop;
