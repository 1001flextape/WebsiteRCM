import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import styles from './SmallBusinessFooter.module.css';

// Function to determine if the display or functional mode should be used
function renderFooterContent(props) {
  const { system, user } = props.data;
  const { isDisplayMode, isFunctionalMode, isDayMode } = system.state;

  const textClass = isDayMode ? styles.textDay : styles.textNight;

  // Render Display Mode Content
  if (isDisplayMode) {
    return (
      <>
        <div className={`${styles.ctaPanel} ${textClass}`}>
          <h2 className={styles.ctaHeading}>Contact Us Today</h2>
          <p className={styles.ctaText}>
            Have questions or need assistance? We're here to help. Contact us for more information.
          </p>
          <a href="/contact" className={styles.ctaButton}>
            Get in Touch
          </a>
        </div>
        <footer className={`${styles.footer} ${textClass}`}>
          <div className={styles.footerContent}>
            {/* Left Side */}
            <div className={styles.leftSide} style={{ alignItems: "center", }}>
              <img src={"https://picsum.photos/800/600?sig=1"} alt="Company Logo" className={styles.logo} />
              <p className={styles.companyName}>Company Name</p>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.icon}><i className="fab fa-facebook"></i></a>
                <a href="#" className={styles.icon}><i className="fab fa-twitter"></i></a>
                <a href="#" className={styles.icon}><i className="fab fa-instagram"></i></a>
                <a href="#" className={styles.icon}><i className="fab fa-linkedin"></i></a>
              </div>
              <div className={styles.contactInfo}>
                <p>(123) 456-7890</p>
                <p>info@example.com</p>
                <p>123 Street, City, Country</p>
              </div>
            </div>

            <div className={styles.resourceListColumn}>
              <p className={styles.header}>Header 1</p>
              <a href="#" className={textClass}>Sales Link 1</a>
              <a href="#" className={textClass}>Sales Link 2</a>
            </div>
            <div className={styles.resourceListColumn}>
              <p className={styles.header}>Header 2</p>
              <a href="#" className={textClass}>Sales Link 3</a>
              <a href="#" className={textClass}>Sales Link 4</a>
            </div>
          </div>
          <div className={`${styles.copyright} ${textClass}`}>
            &copy; 2023 Your Company. All rights reserved.
          </div>
        </footer>
      </>
    );
  }

  // Render Functional Mode Content
  if (isFunctionalMode) {
    console.log('user?.ctaPanelDescription', user?.ctaPanelDescription)
    return (
      <>
        {user.isCtaPanelShowing.value && (
          <div
            className={`${styles.ctaPanel} ${textClass}`}
            style={{
              background: isDayMode
                ? user.colorCtaPanelDay?.value?.color
                : user.colorCtaPanelNight?.value?.color,
              borderRadius: 0,
            }}
          >
            <h2 className={styles.ctaHeading}>{user.ctaPanelHeader.value || "Contact Us Today"}</h2>
            <p className={styles.ctaText}>
              {user?.ctaPanelDescription?.value && (
                <div
                  dangerouslySetInnerHTML={{ __html: user.ctaPanelDescription.value }}
                ></div>
              )}
              {!user?.ctaPanelDescription?.value && (
                <div>
                  Have questions or need assistance? We're here to help. Contact us for more information.
                </div>
              )}

            </p>
            <a
              href="/contact"
              className={styles.ctaButton}
              style={{
                background: isDayMode
                  ? user.colorCtaButtonDay?.value?.color
                  : user.colorCtaButtonNight?.value?.color,
              }}
            >
              Get in Touch
            </a>
          </div>
        )}
        {user.isFooterShowing.value && (
          <footer
            className={`${styles.footer} ${textClass}`}
            style={{
              background: isDayMode
                ? user.colorFooterDay?.value?.color
                : user.colorFooterNight?.value?.color,
            }}
          >
            <div className={styles.footerContent}>
              {/* Left Side */}
              <div className={styles.leftSide}>
                <img src={"https://picsum.photos/800/600?sig=1"} alt="Company Logo" className={styles.logo} />
                <p className={styles.companyName}>Company Name</p>
                <div className={styles.socialIcons}>
                  <a href="#" className={styles.icon}><i className="fab fa-facebook"></i></a>
                  <a href="#" className={styles.icon}><i className="fab fa-twitter"></i></a>
                  <a href="#" className={styles.icon}><i className="fab fa-instagram"></i></a>
                  <a href="#" className={styles.icon}><i className="fab fa-linkedin"></i></a>
                </div>
                <div className={styles.contactInfo}>
                  <p>(123) 456-7890</p>
                  <p>info@example.com</p>
                  <p>123 Street, City, Country</p>
                </div>
              </div>

              {/* Right Side */}
              <div className={styles.rightSide}>
                <div className={styles.resourceListColumn}>
                  <p className={styles.header}>Header 1</p>
                  <a href="#" className={textClass}>Sales Link 1</a>
                  <a href="#" className={textClass}>Sales Link 2</a>
                </div>
                <div className={styles.resourceListColumn}>
                  <p className={styles.header}>Header 2</p>
                  <a href="#" className={textClass}>Sales Link 3</a>
                  <a href="#" className={textClass}>Sales Link 4</a>
                </div>
              </div>
            </div>

          </footer>
        )}
        {user.isCopyrightShowing && (
          <div
            className={`${styles.copyright} ${textClass}`}
            style={{
              background: isDayMode
                ? user.copyrightColorDay?.value?.color
                : user.copyrightColorNight?.value?.color,
            }}
          >
            &copy; 2023 {user.copyrightName?.value || 'Your Brand'}. All rights reserved.
          </div>
        )}
      </>
    );
  }

  return null;
}

function SmallBusinessFooter(props) {
  return (
    <div>
      {renderFooterContent(props)}
    </div>
  );
}

export default SmallBusinessFooter;
