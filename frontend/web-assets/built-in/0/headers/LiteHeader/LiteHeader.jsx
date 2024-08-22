import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import styles from './LiteHeader.module.css';

const LiteHeader = (props) => {
  const { system, user } = props.data;
  const { isDisplayMode, isFunctionalMode, isDayMode } = system.state;
  const [isNightMode, setIsNightMode] = useState(!isDayMode);
  const [isBrightnessDropdownOpen, setBrightnessDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setBrightnessDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleBrightnessDropdown = (event, override) => {
    if (event) {
      event.stopPropagation();
    }
    setBrightnessDropdownOpen(override || !isBrightnessDropdownOpen);
  };

  const toggleNightMode = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setIsNightMode(!isNightMode);
    // Implement the logic to switch between day and night mode here
  };

  const renderNotice = () => (
    <div className={`${styles.notice} ${isDayMode ? styles.noticeDay : styles.noticeNight}`}>
      Important notice goes here.
    </div>
  );

  const renderBranding = () => (
    <div className={`${styles.branding} ${isDayMode ? styles.textGray800 : styles.textGray200}`}>
      <IconButton className={styles.brandingIcon}>
        <HomeIcon />
      </IconButton>
      <a href="#" className={styles.brandingText}>Your Logo</a>
    </div>
  );

  const renderNightModeSwitch = () => (
    <div className={styles.nightModeSwitch}>
      <IconButton className={styles.nightModeSwitchButton} onClick={toggleBrightnessDropdown}>
        {!isNightMode ? <LightModeIcon /> : <ModeNightIcon />}
      </IconButton>
      {isBrightnessDropdownOpen && (
        <div className={`${styles.nightModeDropdown} ${isDayMode ? styles.dropdownDay : styles.dropdownNight}`} ref={dropdownRef}>
          <Switch
            checked={isNightMode}
            onChange={toggleNightMode}
            color="default"
            inputProps={{ 'aria-label': 'toggle day/night mode' }}
          />
          <div className={styles.dropdownContent}>
            {!isNightMode ? <LightModeIcon /> : <ModeNightIcon />}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {isDisplayMode && (
        <>
          {renderNotice()}
          <nav className={`${styles.nav} ${isDayMode ? styles.navDay : styles.navNight}`}>
            {renderBranding()}
            {renderNightModeSwitch()}
          </nav>
        </>
      )}
      {isFunctionalMode && (
        <>
          {renderNotice()}
          <nav className={`${styles.nav} ${isDayMode ? styles.navDay : styles.navNight}`}>
            {renderBranding()}
            {renderNightModeSwitch()}
          </nav>
        </>
      )}
    </>
  );
};

export default LiteHeader;
