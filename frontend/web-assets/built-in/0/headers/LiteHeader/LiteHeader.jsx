import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import styles from './LiteHeader.module.css';
import { useRouter } from 'next/router';

const LiteHeader = (props) => {
  const { system, user } = props.data;
  const { isDisplayMode, isFunctionalMode, isDayMode, isDevMode, isProdMode, assetApiUrl } = system.state;
  const { navigate } = system.utils
  const [isNightMode, setIsNightMode] = useState(!isDayMode);
  const [isBrightnessDropdownOpen, setBrightnessDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  console.log('props', props)
  let navStyles = {};

  if (isFunctionalMode) {
    if (isDayMode) {
      navStyles = {
        background: user.navColorDay.value.color,
        color: user.navColorDay.value.suggestedTextColor,
      }
      // night mode
    } else {
      navStyles = {
        background: user.navColorNight.value.color,
        color: user.navColorNight.value.suggestedTextColor,
      }
    }
  }

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
      {isFunctionalMode && user.isNoticeShowing.value && (
        <div
          className={`${styles.notice} ${isDayMode ? styles.noticeDay : styles.noticeNight}`}
          style={{
            background: isDayMode ? user.noticeColorDay.value.color : user.noticeColorNight.value.color,
            color: isDayMode ? user.noticeColorDay.value.suggestedTextColor : user.noticeColorNight.value.suggestedTextColor,
          }}
        >
          {/* Important notice goes here. */}
          {isDevMode && (
            <div>
              {user.noticeTitle.value || "Important notice goes here."}
            </div>
          )}
          {isProdMode && (
            <div
              onClick={() => navigate(user.noticeLink.value)}
            >
              {user.noticeTitle.value}
            </div>
          )}

        </div>
      )}
    </>
  );

  const RenderBranding = () => {
    return (
      <>
        {isDisplayMode && (
          <div className={`${styles.branding} ${isDayMode ? styles.textGray800 : styles.textGray200}`}>
            <IconButton className={styles.brandingIcon}>
              <HomeIcon />
            </IconButton>
            <a href="#" className={styles.brandingText}>Your Logo</a>
          </div>
        )}
        {isFunctionalMode && user.isBrandShowing.value && (
          <div className={`${styles.branding} ${isDayMode ? styles.textGray800 : styles.textGray200}`}>
            {user.logo.value.url && user.logo.value.url !== "NO_MEDIA" && (
              <IconButton
                className={styles.brandingIcon}
                onClick={isProdMode ? () => navigate(user.brandLink.value) : () => { }}
              >
                <img
                  src={`${assetApiUrl}${user.logo.value.url}`}
                  style={{
                    width: "50px",
                  }}
                />
              </IconButton>
            )}
            <div
              onClick={isProdMode ? () => navigate(user.brandLink.value) : () => { }}
              className={styles.brandingText}>
              {user.brandText.value}
            </div>
          </div>
        )}
      </>
    )
  }

  const RenderNav = () => {

    return (
      // navColorDay
      <>
        {isDisplayMode && (
          <nav className={`${styles.nav} ${isDayMode ? styles.navDay : styles.navNight}`}>
            <RenderBranding />
            <RenderNightModeSwitch />
          </nav>
        )}
        {isFunctionalMode && user.isNavShowing.value && (
          <nav
            className={`${styles.nav} ${isDayMode ? styles.navDay : styles.navNight}`}
            style={{
              ...navStyles,
            }}
          >
            <RenderBranding />
            <RenderNightModeSwitch />
          </nav>
        )}
      </>

    )
  }

  const RenderNightModeSwitch = () => {
    return (
      <div className={styles.nightModeSwitch}>
        <IconButton className={styles.nightModeSwitchButton} onClick={toggleBrightnessDropdown}>
          {!isNightMode ? <LightModeIcon /> : <ModeNightIcon />}
        </IconButton>
        {isBrightnessDropdownOpen && (
          <div
            className={`${styles.nightModeDropdown} ${isDayMode ? styles.dropdownDay : styles.dropdownNight}`}
            style={{
              ...(isFunctionalMode ? navStyles : {}),
            }}
            ref={dropdownRef}
          >
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
    )
  }

  return (
    <>
      <>
        <RenderNotice />
        <RenderNav />
      </>
    </>
  );
};

export default LiteHeader;
