import React from 'react';
import styles from './BasicCtaHeader.module.css';

const getTextColor = (suggestedTextColor) => {
  console.log('suggestedTextColor', suggestedTextColor)
  switch (suggestedTextColor) {
    case "LIGHT":
      return "#f1f4f5"
    case "DARK":
      return "rgb(96, 96, 96)"
    default:
      return "#f1f4f5"
  }
}

const BasicCtaHeader = (props) => {
  const { system, user } = props.data;
  const {
    isDayMode,
    isNightMode,
    isDisplayMode,
    isFunctionalMode,
    isProdMode,
    assetApiUrl,
  } = system.state;
  const {
    navigate
  } = system.utils

  let isShowing = true;
  let header = "Empower Your Small Business"
  let description = "Unlock success with tailored solutions and expert guidance."
  let buttonText = "Get Started"

  let backgroundStyles = {}
  let buttonStyles = {}

  if (isFunctionalMode) {
    isShowing = user?.isShowing?.value || true;
    header = user?.header?.value
    description = user?.description?.value?.html
    buttonText = user?.ctaButtonText?.value

    backgroundStyles = {
      backgroundColor: isNightMode
        ? user?.backgroundColorNight?.value?.color
        : user?.backgroundColorDay?.value?.color,
      color: isNightMode
        ? getTextColor(user?.backgroundColorNight?.value?.suggestedTextColor)
        : getTextColor(user?.backgroundColorDay?.value?.suggestedTextColor),
    }

    buttonStyles = {
      backgroundColor: isNightMode
        ? user?.ctaButtonColorNight?.value?.color
        : user?.ctaButtonColorDay?.value?.color,
      color: isNightMode
        ? getTextColor(user?.ctaButtonColorNight?.value?.suggestedTextColor)
        : getTextColor(user?.ctaButtonColorDay?.value?.suggestedTextColor),
    }
  }

  return (
    <>
      {isShowing && (
        <section
          className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}
          style={backgroundStyles}
        >
          <div className={`${styles.overlay} ${isNightMode ? styles.overlayNight : ''}`}></div>
          <div className={styles.content}>
            <h1 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>
              {header}
            </h1>
            <p className={`${styles.subheading} ${isNightMode ? styles.subheadingNight : ''}`}
              dangerouslySetInnerHTML={{ __html: description }}
            >

            </p>
            <a
              href="#cta" // Replace with your desired link
              className={`${styles.ctaButton} ${isNightMode ? styles.ctaButtonNight : ''}`}
              style={buttonStyles}
              onClick={isProdMode ? navigate(user.ctaButtonLink.value) : () => { }}
            >
              {buttonText}
            </a>
          </div>
        </section>
      )}
    </>
  );
};

export default BasicCtaHeader;
