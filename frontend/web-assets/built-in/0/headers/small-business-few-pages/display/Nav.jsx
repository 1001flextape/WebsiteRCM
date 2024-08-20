import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DisplayBranding from './Branding';
import DisplayNightModeSwitchMobile from './NightModeSwitchMobile';
import DisplayNightModeSwitchDesktop from './NightModeSwitchDesktop';
import DisplayLinksDesktop from './LinksDesktop';
import DisplayCallToAction from './CallToAction';
import DisplaySocialMobile from './SocialMobile';
import DisplayLinksMobile from './LinksMobile';
import styles from '../component.module.css';

function DisplayNav(props) {
  const [isDayMode] = useState(true); // Dummy data
  const navClasses = isDayMode ? styles.navbarDay : styles.navbarNight;
  const signInClasses = isDayMode ? styles.textGray800Hover : styles.textGray200Hover;

  const [isMenuOpen, setMenuOpen] = useState(true);

  const springProps = useSpring({
    height: isMenuOpen ? 'auto' : 0,
    opacity: isMenuOpen ? 1 : 0,

    flexDirection: "column",
  });

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${navClasses}`}>
        <DisplayBranding {...props} />
        <div className={styles.mobileMenu}>
          <DisplayNightModeSwitchMobile />
          <IconButton color="inherit" className={styles.menuIconButton} onClick={toggleMenu}>
            <MenuIcon className={signInClasses} />
          </IconButton>
        </div>
        <div className={styles.desktopMenu}>
          <DisplayNightModeSwitchDesktop />
          <DisplayLinksDesktop />
          <DisplayCallToAction />
          <a href="#" className={signInClasses}>
            Sign In
          </a>
        </div>
      </nav>
      <animated.div style={springProps} className={`${styles.navbar} ${navClasses} ${styles.overflowHidden}`}>
        <div className={styles.animatedMenu}>
          <DisplaySocialMobile {...props} />
          <div className={styles.callToActionContainer}>
            <DisplayCallToAction />
            <div className={`${signInClasses} ${styles.signInButton}`}>
              Sign in
            </div>
          </div>
        </div>
        <DisplayLinksMobile />
      </animated.div>
    </>
  );
}

export default DisplayNav;
