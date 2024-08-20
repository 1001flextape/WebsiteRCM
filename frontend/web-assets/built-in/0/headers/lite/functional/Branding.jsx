import React from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import styles from '../component.module.css';

function FunctionalBranding(props) {
  const { user, system } = props.data;
  const { isDayMode } = system.state;

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
    <div className={`${styles.branding} ${textClass}`}>
      {user.isBrandShowing && (
        <>
          {user.isLogoShowing && user.logo?.type === 'BUILT_IN' && (
            <img
              src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${user.logo.url}`}
              alt="Preview"
              className={`${styles.brandingIcon}`}
              style={{ height: '40px' }}
            />
          )}
          {user.isLogoShowing && (!user.logo || user.logo?.type === 'NONE') && (
            <IconButton className={`${styles.brandingIcon}`}>
              <HomeIcon />
            </IconButton>
          )}
          {user.isBrandTextShowing && (
            <a href="#" className={`${styles.brandingText}`}>
              {user.brandText || 'Your Brand'}
            </a>
          )}
        </>
      )}
    </div>
  );
}

export default FunctionalBranding;
