import React, { useState, useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import styles from './SmallBusinessFewPagesHeader.module.css';

function SmallBusinessFewPagesHeader(props) {
  const [isDayMode, setIsDayMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBrightnessDropdownOpen, setBrightnessDropdownOpen] = useState(false);
  const [isNightModeVar, setNightModeVar] = useState(!isDayMode);

  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setBrightnessDropdownOpen(false);
    }
  };

  // Toggle brightness dropdown
  const toggleBrightnessDropdown = (event, override) => {
    if (event) {
      event.stopPropagation();
    }
    setBrightnessDropdownOpen(override || !isBrightnessDropdownOpen);
  };

  // Toggle day/night mode
  const toggleNightMode = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setNightModeVar(!isNightModeVar);
    setIsDayMode(!isNightModeVar);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const navClasses = isDayMode ? styles.navbarDay : styles.navbarNight;
  const signInClasses = isDayMode ? styles.textGray800Hover : styles.textGray200Hover;
  const brandingClasses = isDayMode ? styles.textGray800 : styles.textGray200;
  const dropdownClasses = isDayMode ? styles.bgStone500 : styles.bgStone600;

  return (
    <>
      <nav className={`${styles.navbar} ${navClasses}`}>
        <div className={`${brandingClasses} ${styles.navbarContent}`}>
          <IconButton color="inherit" className="mr-2">
            <HomeIcon />
          </IconButton>
          <a href="javascript:void(0)" className="mr-5">
            Your Logo
          </a>
          <div className={styles.navbarSocialDesktop}>
            <a href="javascript:void(0)" className={signInClasses}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="javascript:void(0)" className={signInClasses}>
              <i className="fab fa-youtube"></i>
            </a>
            <a href="javascript:void(0)" className={signInClasses}>
              𝕏
            </a>
          </div>
        </div>
        <div className={styles.mobileMenu}>
          <IconButton
            color="inherit"
            className={styles.menuIconButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon className={signInClasses} />
          </IconButton>
          <IconButton
            color="inherit"
            className="mr-2"
            onClick={(event) => toggleBrightnessDropdown(event, true)}
          >
            {!isNightModeVar ? <LightModeIcon className={signInClasses} /> : <ModeNightIcon className={signInClasses} />}
            {isBrightnessDropdownOpen && (
              <div
                className={`absolute ${dropdownClasses} text-white p-2`}
                style={{ top: '32px', right: '0px' }}
                ref={dropdownRef}
              >
                <Switch
                  checked={isNightModeVar}
                  onChange={toggleNightMode}
                  color="default"
                  inputProps={{ 'aria-label': 'toggle day/night mode' }}
                />
              </div>
            )}
          </IconButton>
        </div>
        <div className={styles.desktopMenu}>
          <div className={styles.navbarLinksDesktop}>
            <a href="#" className={signInClasses}>About</a>
            <a href="#" className={signInClasses}>Services</a>
          </div>
          <div className={styles.callToActionContainer}>
            <div className={`${dropdownClasses} text-white hover:text-gray-300 px-4 py-2 rounded cursor-pointer`}>
              Contact
            </div>
            <div className={`${signInClasses} ${styles.signInButton}`}>
              Sign in
            </div>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className={`${styles.navbar} ${navClasses} ${styles.overflowHidden}`}>
          <div className={styles.animatedMenu}>
            <div className={styles.navbarSocialMobile}>
              <IconButton className={signInClasses}>
                <i className={`fab fa-instagram ${signInClasses}`}></i>
              </IconButton>
              <IconButton className={signInClasses}>
                <i className={`fab fa-youtube ${signInClasses}`}></i>
              </IconButton>
              <IconButton className={signInClasses}>
                <i className={`fab ${signInClasses}`}>𝕏</i>
              </IconButton>
            </div>
            <div className={styles.callToActionContainer}>
              <div className={`${dropdownClasses} text-white hover:text-gray-300 px-4 py-2 rounded cursor-pointer`}>
                Contact
              </div>
              <div className={`${signInClasses} ${styles.signInButton}`}>
                Sign in
              </div>
            </div>
          </div>
          <div className={styles.navbarLinksMobile}>
            <ul>
              <li><a href="#" className={signInClasses}>Services</a></li>
              <li><a href="#" className={signInClasses}>Locations</a></li>
              <li><a href="#" className={signInClasses}>About</a></li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default SmallBusinessFewPagesHeader;
