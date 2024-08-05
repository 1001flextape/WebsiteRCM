import React, { useState } from 'react';
import styles from '../component.module.css';

function DisplayLinksMobile() {
  const [isDayMode] = useState(true); // Dummy data
  const classes = isDayMode ? styles.textGray800 : styles.textGray200;

  return (
    <div className={styles.navbarLinksMobile}>
      <ul>
        <li>
          <a href="#" className={classes}>
            Services
          </a>
        </li>
        <li>
          <a href="#" className={classes}>
            Locations
          </a>
        </li>
        <li>
          <a href="#" className={classes}>
            About
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DisplayLinksMobile;
