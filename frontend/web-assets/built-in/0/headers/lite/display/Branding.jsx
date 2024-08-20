import React from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import styles from '../component.module.css';

function DisplayBranding(props) {
  const { system } = props.data;
  const { isDayMode } = system.state;

  const brandingClasses = isDayMode ? styles.textGray800 : styles.textGray200;

  return (
    <div className={`${styles.branding} ${brandingClasses}`}>
      <IconButton className={styles.brandingIcon}>
        <HomeIcon />
      </IconButton>
      <a href="#" className={styles.brandingText}>Your Logo</a>
    </div>
  );
}

export default DisplayBranding;
