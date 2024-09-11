import React from 'react';
import styles from './TopThreeHighlights.module.css';

const getTextColor = (suggestedTextColor) => {
  switch (suggestedTextColor) {
    case "LIGHT":
      return "#f1f4f5"
    case "DARK":
      return "rgb(96, 96, 96)"
    default:
      return "#f1f4f5"
  }
}

const TopThreeHighlights = (props) => {

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
  let header = "Why Choose Us?"
  let description = "  Explore the key reasons to choose us. From exceptional service to swift delivery and dedicated customer satisfaction, we're committed to exceeding your expectations.";

  const highlights = [
    {
      title: 'Quality Service',
      description: 'Exceptional service that exceeds your expectations.',
      icon: '🌟',
    },
    {
      title: 'Fast Delivery',
      description: 'Swift and efficient delivery for your convenience.',
      icon: '🚚',
    },
    {
      title: 'Customer Satisfaction',
      description: 'Dedicated to ensuring your satisfaction with our products.',
      icon: '😊',
    },
  ];


  let backgroundStyle = {}

  if (isFunctionalMode) {
    isShowing = user?.isShowing?.value || true
    header = user?.header?.value
    description = user?.description?.value

    backgroundStyle = {
      backgroundColor: isNightMode
        ? user?.backgroundColorNight?.value?.color
        : user?.backgroundColorDay?.value?.color,
      color: isNightMode
        ? getTextColor(user?.backgroundColorNight?.value?.suggestedTextColor)
        : getTextColor(user?.backgroundColorDay?.value?.suggestedTextColor),
    }
  }

  return (
    <section
      className={isNightMode ? styles.sectionNight : styles.section}
      style={backgroundStyle}
    >
      <div className={styles.container}>
        <h3 className={isNightMode ? styles.headingNight : styles.heading}>{header}</h3>
        <div
          className={isNightMode ? styles.descriptionNight : styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        >
        </div>

        <div className={styles.highlights}>
          {highlights.map((highlight, index) => (
            <div key={index} className={styles.highlight}>
              <div className={isNightMode ? styles.highlightCardNight : styles.highlightCard}>
                <span className={styles.icon}>{highlight.icon}</span>
                <h3 className={isNightMode ? styles.titleNight : styles.title}>{highlight.title}</h3>
                <p className={isNightMode ? styles.textNight : ''}>{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopThreeHighlights;
