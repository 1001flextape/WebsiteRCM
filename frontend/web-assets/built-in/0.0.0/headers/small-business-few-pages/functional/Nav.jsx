import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FunctionalBranding from './Branding';
import FunctionalNightModeSwitchMobile from './NightModeSwitchMobile';
import FunctionalNightModeSwitchDesktop from './NightModeSwitchDesktop';
import FunctionalLinksDesktop from './LinksDesktop';
import FunctionalCallToAction from './CallToAction';
import FunctionalSocialMobile from './SocialMobile';
import FunctionalLinksMobile from './LinksMobile';
import styles from '../component.module.css';

function FunctionalNav(props) {
  const { user, system } = props.data;
  const {
    isDayMode,
    isNightMode,
  } = system.state;

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

  const renderSuggestedTextColorWithHoverClass = (value) => {
    switch (value) {
      case 'LIGHT':
        return styles.textGray200Hover;
      case 'DARK':
        return styles.textGray800Hover;
      default:
        return styles.textGray800Hover;
    }
  };

  const navClasses = renderSuggestedTextColorClass(
    isDayMode ? user.navColorDay?.suggestedTextColor : user.navColorNight?.suggestedTextColor
  );

  const signInClasses = renderSuggestedTextColorWithHoverClass(
    isDayMode ? user.navColorDay?.suggestedTextColor : user.navColorNight?.suggestedTextColor
  );

  const [isMenuOpen, setMenuOpen] = useState(true);

  const springProps = useSpring({
    height: isMenuOpen ? 'auto' : 0,
    opacity: isMenuOpen ? 1 : 0,
    backgroundColor: isDayMode ? user.navColorDay.color || 'rgb(228, 228, 231)' : user.navColorNight.color || 'rgb(77, 77, 77)',
  });

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {user.isNavShowing && (
        <>
          <nav className={`${styles.navbar} ${navClasses}`} style={{
            backgroundColor: isDayMode ? user.navColorDay.color || 'rgb(228, 228, 231)' : user.navColorNight.color || 'rgb(77, 77, 77)',
          }}>
            <FunctionalBranding {...props} />
            <div className="lg:hidden">
              <FunctionalNightModeSwitchMobile {...props} />
              <IconButton color="inherit" className="mr-2" onClick={toggleMenu}>
                <MenuIcon className={signInClasses} />
              </IconButton>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <FunctionalNightModeSwitchDesktop {...props} />
              <FunctionalLinksDesktop {...props} />
              <FunctionalCallToAction {...props} />
              <a href="#" className={signInClasses}>
                Sign In
              </a>
            </div>
          </nav>
          <animated.div style={springProps} className={`${styles.navbar} ${navClasses} lg:hidden overflow-hidden`}>
            <div className="my-2 px-4" style={{ borderBottom: '1px solid rgb(229, 231, 235)' }}>
              <FunctionalSocialMobile {...props} />
              <div className="py-2">
                <FunctionalCallToAction {...props} />
                <div className={`${signInClasses} px-4 py-2 rounded cursor-pointer`}>
                  Sign in
                </div>
              </div>
            </div>
            <FunctionalLinksMobile {...props} />
          </animated.div>
        </>
      )}
    </>
  );
}

export default FunctionalNav;
