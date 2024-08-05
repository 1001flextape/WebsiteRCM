import React, { useState } from 'react';
import styles from '../component.module.css';

function FunctionalLinksDesktop(props) {
  const { user, system } = props.data;
  const {
    isDayMode,
    isNightMode,
  } = system.state;

  const renderSuggestedTextColorClass = (value) => {
    switch (value) {
      case 'LIGHT':
        return styles.textGray200;
      case 'DARK':
        return styles.textGray800;
      default:
        return styles.textGray800;
    }
  };

  const classes = renderSuggestedTextColorClass(
    isDayMode ? user.navColorDay?.suggestedTextColor : user.navColorNight?.suggestedTextColor
  );

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

export default FunctionalLinksDesktop;
