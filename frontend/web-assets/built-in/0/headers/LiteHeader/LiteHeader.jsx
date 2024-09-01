import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import styles from './LiteHeader.module.css';

const LiteHeader = (props) => {
  const { system, user } = props.data;
  const { isDisplayMode, isFunctionalMode, isDayMode, isDevMode, isProdMode } = system.state;
  const [isNightMode, setIsNightMode] = useState(!isDayMode);
  const [isBrightnessDropdownOpen, setBrightnessDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  console.log('props', props)

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

  const RenderNotice = () => (
    <>
      {isDisplayMode && (
        <div
          className={`${styles.notice} ${isDayMode ? styles.noticeDay : styles.noticeNight}`}
        >
          Important notice goes here.
        </div>
      )}
      {isFunctionalMode && user.isNoticeShowing && (
        <div
          className={`${styles.notice} ${isDayMode ? styles.noticeDay : styles.noticeNight}`}
          style={{
            background: isDayMode ? user.noticeColorDay.color : user.noticeColorNight.color,
            color: isDayMode ? user.noticeColorDay.suggestedTextColor : user.noticeColorNight.suggestedTextColor,
          }}
        >
          {/* Important notice goes here. */}
          {isDevMode && (
            <>
              {user.noticeTitle || "Important notice goes here."}
            </>
          )}
          {isProdMode && (
            <>
              {user.noticeTitle}
            </>
          )}

        </div>
      )}
    </>
  );

  const RenderBranding = () => (
    <div className={`${styles.branding} ${isDayMode ? styles.textGray800 : styles.textGray200}`}>
      <IconButton className={styles.brandingIcon}>
        <HomeIcon />
      </IconButton>
      <a href="#" className={styles.brandingText}>Your Logo</a>
    </div>
  );

  const RenderNightModeSwitch = () => (
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
          <RenderNotice />
          <nav className={`${styles.nav} ${isDayMode ? styles.navDay : styles.navNight}`}>
            <RenderBranding />
            <RenderNightModeSwitch />
          </nav>
        </>
      )}
      {isFunctionalMode && (
        <>
          <RenderNotice />
          <nav
            className={`${styles.nav} ${isDayMode ? styles.navDay : styles.navNight}`}
          >
            <RenderBranding />
            <RenderNightModeSwitch />
          </nav>
        </>
      )}
    </>
  );
};

export default LiteHeader;
