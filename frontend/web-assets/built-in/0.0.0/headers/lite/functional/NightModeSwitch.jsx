import React, { useEffect, useRef, useState } from 'react';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import styles from '../component.module.css';

function FunctionalNightModeSwitch(props) {
  const { user, system } = props.data;
  const { isDayMode } = system.state;
  const [isNightModeVar, setNightModeVar] = useState(false);
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
    setNightModeVar(!isNightModeVar);
    // Implement logic to switch between day and night mode
  };

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

  const textClass = renderSuggestedTextColorClass(
    isDayMode ? user.navColorDay?.suggestedTextColor : user.navColorNight?.suggestedTextColor
  );

  const dropdownClasses = isDayMode ? styles.dropdownDay : styles.dropdownNight;

  return (
    user.isDayNightSelectorShowing && (
      <div className={styles.nightModeSwitch}>
        <IconButton className={textClass} onClick={toggleBrightnessDropdown}>
          {!isNightModeVar ? <LightModeIcon /> : <ModeNightIcon />}
        </IconButton>
        {isBrightnessDropdownOpen && (
          <div
            className={`${styles.nightModeDropdown} ${dropdownClasses}`}
            ref={dropdownRef}
            style={{
              background: isDayMode ? user.dayNightSelectorColorDay.color : user.dayNightSelectorColorNight.color,
            }}
          >
            <Switch
              checked={isNightModeVar}
              onChange={toggleNightMode}
              color="default"
              inputProps={{ 'aria-label': 'toggle day/night mode' }}
            />
            <div className={styles.dropdownContent}>
              {!isNightModeVar ? <LightModeIcon /> : <ModeNightIcon />}
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default FunctionalNightModeSwitch;
