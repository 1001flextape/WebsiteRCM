import React from 'react';
import styles from '../component.module.css';

function FunctionalCta(props) {
  const { system, user } = props.data;
  const { isDayMode } = system.state;

  const textClass = isDayMode
    ? styles.textDay
    : styles.textNight;

  return (
    <>
      {user.isCtaPanelShowing && (
        <div
          className={`${styles.ctaPanel} ${textClass}`}
          style={{
            background: isDayMode
              ? user.colorCtaPanelDay?.color
              : user.colorCtaPanelNight?.color,
          }}
        >
          <h2 className={styles.ctaHeading}>Contact Us Today</h2>
          <p className={styles.ctaText}>
            Have questions or need assistance? We're here to help. Contact us
            for more information.
          </p>
          <a
            href="/contact"
            className={styles.ctaButton}
            style={{
              background: isDayMode
                ? user.colorCtaButtonDay?.color
                : user.colorCtaButtonNight?.color,
            }}
          >
            Get in Touch
          </a>
        </div>
      )}
    </>
  );
}

export default FunctionalCta;
