import React from 'react';
import styles from '../component.module.css';

function FunctionalSocialDesktop(props) {
  const { user, system } = props.data;
  const {
    isDayMode,
  } = system.state;

  const classes = isDayMode ? styles.textGray800Hover : styles.textGray200Hover;

  return (
    <div className={styles.navbarSocialDesktop}>
      <a href="javascript:void(0)" className={classes}>
        <i className="fab fa-instagram"></i>
      </a>
      <a href="javascript:void(0)" className={classes}>
        <i className="fab fa-youtube"></i>
      </a>
      <a href="javascript:void(0)" className={classes}>
        𝕏
      </a>
    </div>
  );
}

export default FunctionalSocialDesktop;
