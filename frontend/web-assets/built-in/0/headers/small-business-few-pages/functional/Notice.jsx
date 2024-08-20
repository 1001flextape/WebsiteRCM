import React from 'react';
import styles from '../component.module.css';

function FunctionalNotice(props) {
  const { user, system } = props.data;
  const {
    isDayMode,
  } = system.state;

  const noticeClasses = isDayMode ? styles.bgZinc200 : styles.bgZinc800;

  return (
    <div className={`${styles.p2} ${styles.textCenter} ${styles.hoverUnderline} ${noticeClasses} ${isDayMode ? styles.textGray800 : styles.textGray200}`}>
      {user.noticeText || 'Important notice goes here.'}
    </div>
  );
}

export default FunctionalNotice;
