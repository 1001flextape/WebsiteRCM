import React from 'react';
import IconButton from '@mui/material/IconButton';
import styles from '../component.module.css';

function FunctionalSocialMobile(props) {
  const { user, system } = props.data;
  const {
    isDayMode,
  } = system.state;

  const classes = isDayMode ? styles.textGray800Hover : styles.textGray200Hover;

  return (
    <div className={styles.navbarSocialMobile}>
      <IconButton className={classes}>
        <i className={`fab fa-instagram ${classes}`}></i>
      </IconButton>
      <IconButton className={classes}>
        <i className={`fab fa-youtube ${classes}`}></i>
      </IconButton>
      <IconButton className={classes}>
        <i className={`fab ${classes}`}>𝕏</i>
      </IconButton>
    </div>
  );
}

export default FunctionalSocialMobile;
