import React from 'react';
import styles from './SectionHeader.module.css';

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

const SectionHeader = (props) => {
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
  let header = "Discover Exciting Opportunities with Us"

  let backgroundStyles = {}

  if (isFunctionalMode) {
    isShowing = user?.isShowing?.value || true;
    header = user?.header?.value

    backgroundStyles = {
      backgroundColor: isNightMode
        ? user?.backgroundColorNight?.value?.color
        : user?.backgroundColorDay?.value?.color,
      color: isNightMode
        ? getTextColor(user?.backgroundColorNight?.value?.suggestedTextColor)
        : getTextColor(user?.backgroundColorDay?.value?.suggestedTextColor),
    }
  }

  return (
    <>
      {isShowing && (
        <section
          className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}
          style={backgroundStyles}
        >
          <div className={styles.container}>
            <h2 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>
              {header}
            </h2>
          </div>
        </section>
      )}
    </>
  );
};

export default SectionHeader;
