import React from 'react';
import styles from './PageHeader.module.css';

const PageHeader = (props) => {
  const { system, user } = props.data;
  const {
    isDayMode,
    isNightMode,
    isDisplayMode,
    isFunctionalMode,
  } = system.state;

  // backgroundColorDay: Object { type: "COLOR_SELECTION:V1", value: {…} }
  // backgroundColorNight: Object { type: "COLOR_SELECTION:V1", value: {…} }
  // header: Object { type: "YDOC:V1", value: "asdf !" }
  // isShowing: Object { type: "SWITCH:V1", value: true }

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

  if (isDisplayMode) {
    return (
      <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
        <div className={styles.container}>
          <h1 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>
            Ignite Your Journey with Innovative Solutions
          </h1>
        </div>
      </section>
    );
  }

  if (isFunctionalMode) {
    if (!user.isShowing.value) {
      return (<div></div>)
    }

    const panelStyles = {
      background: isNightMode ?
        user?.backgroundColorNight?.value?.color :
        user?.backgroundColorDay?.value?.color,
      color: isNightMode ?
        getTextColor(user?.backgroundColorNight?.value?.suggestedTextColor) :
        getTextColor(user?.backgroundColorDay?.value?.suggestedTextColor)
    }

    return (
      <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`} style={panelStyles}>
        <div className={styles.container}>
          <h1 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`} style={panelStyles}>
            {user?.header?.value || "Ignite Your Journey with Innovative Solutions"}
          </h1>
        </div>
      </section>
    );
  }
};

export default PageHeader;
