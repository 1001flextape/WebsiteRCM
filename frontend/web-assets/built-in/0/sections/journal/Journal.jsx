import React from 'react';
import styles from './Journal.module.css';

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

const JournalSection = (props) => {
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

  let isShowing = true
  let isHeaderShowing = true
  let header = "Explore Current Trends with Us"
  let isJournalShowing = true
  let journal = "Explore a diverse range of content thoughtfully curated for you. Our hub is designed to offer valuable insights and keep you informed. Discover opportunities as you navigate through our content and stay updated on the latest trends without any noise."

  let backgroundStyle = {}

  console.log('asdf', user)

  if (isFunctionalMode) {
    isShowing = user?.isShowing?.value || true
    isHeaderShowing = user?.isHeaderShowing?.value
    header = user?.header?.value
    isJournalShowing = user?.isJournalShowing?.value
    journal = user?.journal?.value?.html

    backgroundStyle = {
      backgroundColor: isNightMode
        ? user?.backgroundColorNight?.value?.color
        : user?.backgroundColorDay?.value?.color,
      color: isNightMode
        ? getTextColor(user?.backgroundColorNight?.value?.suggestedTextColor)
        : getTextColor(user?.backgroundColorDay?.value?.suggestedTextColor),
    }
  }

  // backgroundColorDay: Object { type: "COLOR_SELECTION:V1", value: {…} }
  // backgroundColorNight: Object { type: "COLOR_SELECTION:V1", value: {…} }
  // header: Object { type: "YDOC:V1", value: "asdf" }
  // isHeaderShowing: Object { type: "SWITCH:V1", value: true }
  // isJournalShowing: Object { type: "SWITCH:V1", value: true }
  // isShowing: Object { type: "SWITCH:V1", value: true }
  // journal: Object { type: "WYSIWYG:V1", value: {…} }

  return (
    <>
      {isShowing && (
        <section
          className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}
          style={backgroundStyle}
        >
          <div className={styles.container}>
            {isHeaderShowing && (

              <h3 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>
                {header}
              </h3>
            )}
            {isJournalShowing && (

              <p
                className={`${styles.text} ${isNightMode ? styles.textNight : ''}`}
                dangerouslySetInnerHTML={{ __html: journal }}
              >
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default JournalSection;
