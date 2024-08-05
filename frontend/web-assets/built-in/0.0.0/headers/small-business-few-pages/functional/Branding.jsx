import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import FunctionalSocialDesktop from './SocialDesktop';
import styles from '../component.module.css';

function FunctionalBranding(props) {
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

  const textClass = renderSuggestedTextColorClass(
    isDayMode ? user.navColorDay?.suggestedTextColor : user.navColorNight?.suggestedTextColor
  );

  return (
    <div className={`${textClass} ${styles.navbar}`}>
      {user.isBrandShowing && (
        <>
          {user.isLogoShowing && (
            <>
              {user.logo?.type === 'BUILT_IN' && (
                <img
                  src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${user.logo.url}`}
                  style={{ height: '40px' }}
                  alt="Preview"
                  className="mr-2"
                />
              )}
              {(!user.logo || user.logo?.type === 'NONE') && (
                <IconButton color="inherit" className="mr-2">
                  <HomeIcon />
                </IconButton>
              )}
            </>
          )}
          {user.isBrandTextShowing && (
            <a href="#" className="mr-5">
              {user?.brandText || 'Your Brand'}
            </a>
          )}
          <FunctionalSocialDesktop {...props} />
        </>
      )}
    </div>
  );
}

export default FunctionalBranding;
