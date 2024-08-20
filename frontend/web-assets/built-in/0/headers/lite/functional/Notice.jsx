import React from 'react';
import styles from '../component.module.css';

function FunctionalNotice(props) {
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

  const noticeClasses = renderSuggestedTextColorClass(
    isDayMode ? user.noticeColorDay?.suggestedTextColor : user.noticeColorNight?.suggestedTextColor
  );

  return (
    user.isNoticeShowing && (
      <div
        className={`${styles.notice} ${noticeClasses}`}
        style={{
          backgroundColor: isDayMode ? user.noticeColorDay?.color : user.noticeColorNight?.color,
        }}
      >
        {user.noticeTitle || 'Important notice goes here.'}
      </div>
    )
  );
}

export default FunctionalNotice;
