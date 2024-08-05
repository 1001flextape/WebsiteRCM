import React from 'react';
import styles from '../component.module.css';

function DisplayNotice(props) {
  const { system } = props.data;
  const { isDayMode } = system.state;

  const noticeClasses = isDayMode ? styles.noticeDay : styles.noticeNight;

  return (
    <div className={`${styles.notice} ${noticeClasses}`}>
      Important notice goes here.
    </div>
  );
}

export default DisplayNotice;
