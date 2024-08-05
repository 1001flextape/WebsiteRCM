import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import DisplaySocialDesktop from './SocialDesktop';
import styles from '../component.module.css';

function DisplayBranding(props) {
  const [isDayMode] = useState(true); // Dummy data
  const brandingClasses = isDayMode ? styles.textGray800 : styles.textGray200;

  return (
    <div className={`${brandingClasses} ${styles.navbar}`}>
      <IconButton color="inherit" className="mr-2">
        <HomeIcon />
      </IconButton>
      <a href="javascript:void(0)" className='mr-5'>
        Your Logo
      </a>
      <DisplaySocialDesktop {...props} />
    </div>
  );
}

export default DisplayBranding;
