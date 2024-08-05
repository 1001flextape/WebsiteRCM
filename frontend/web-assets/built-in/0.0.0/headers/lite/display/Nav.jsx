import React from 'react';
import DisplayBranding from './Branding';
import DisplayNightModeSwitch from './NightModeSwitchDesktop';
import styles from '../component.module.css';

function DisplayNav(props) {
  const { system } = props.data;
  const { isDayMode } = system.state;

  const navClasses = isDayMode ? styles.navDay : styles.navNight;

  return (
    <nav className={`${styles.nav} ${navClasses}`}>
      <DisplayBranding {...props} />
      <DisplayNightModeSwitch {...props} />
    </nav>
  );
}

export default DisplayNav;
