import React, { useState } from 'react';
import styles from '../component.module.css';

function FunctionalCallToAction(props) {
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
    isDayMode ? user.callToActionColorDay?.suggestedTextColor : user.callToActionColorNight?.suggestedTextColor
  );

  return (
    <>
      {user.isCallToActionShowing && (
        <div
          style={{
            backgroundColor: isDayMode
              ? user.callToActionColorDay.color || 'rgb(228, 228, 231)'
              : user.callToActionColorNight.color || 'rgb(77, 77, 77)',
          }}
          className={`${classes} px-4 py-2 rounded cursor-pointer`}
        >
          {user.callToActionTitle || 'Contact'}
        </div>
      )}
    </>
  );
}

export default FunctionalCallToAction;
