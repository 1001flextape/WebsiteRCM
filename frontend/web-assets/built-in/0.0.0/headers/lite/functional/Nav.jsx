import React from 'react';
import FunctionalBranding from './Branding';
import FunctionalNightModeSwitch from './NightModeSwitch';
import styles from '../component.module.css';

function FunctionalNav(props) {
  const { user, system } = props.data;
  const { isDayMode } = system.state;

  return (
    user.isNavShowing && (
      <nav
        className={styles.nav}
        style={{
          backgroundColor: isDayMode ? user.navColorDay.color : user.navColorNight.color,
        }}
      >
        <FunctionalBranding {...props} />
        <FunctionalNightModeSwitch {...props} />
      </nav>
    )
  );
}

export default FunctionalNav;
