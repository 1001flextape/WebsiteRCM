import React, { useEffect, useRef, useState } from 'react';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import styles from '../component.module.css';

function DisplayNightModeSwitchMobile() {
  const [isDayMode] = useState(true); // Dummy data
  const [isBrightnessDropdownOpen, setBrightnessDropdownOpen] = useState(false);
  const [isNightModeVar, setNightModeVar] = useState(!isDayMode);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setBrightnessDropdownOpen(false);
    }
  };

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

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const buttonClasses = isDayMode ? styles.textGray800 : styles.textGray200;
  const dropdownClasses = isDayMode ? styles.bgStone500 : styles.bgStone600;

  return (
    <IconButton color="inherit" className="mr-2" onClick={() => toggleBrightnessDropdown(event, true)}>
      {!isNightModeVar && <LightModeIcon className={buttonClasses} />}
      {isNightModeVar && <ModeNightIcon className={buttonClasses} />}
      {isBrightnessDropdownOpen && (
        <div className={`absolute ${dropdownClasses} text-white p-2`} style={{ top: '38px', right: '0px' }} ref={dropdownRef}>
          <Switch
            checked={isNightModeVar}
            onChange={toggleNightMode}
            color="default"
            inputProps={{ 'aria-label': 'toggle day/night mode' }}
          />
        </div>
      )}
    </IconButton>
  );
}

export default DisplayNightModeSwitchMobile;
