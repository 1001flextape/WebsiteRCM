import React from 'react';
import styles from './HalfImageHalfParagraph.module.css';

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

const HalfImageHalfParagraph = (props) => {

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
  let image = `https://picsum.photos/400/400?sig=${Math.floor(Math.random() * 1000)}`
  let header = "Empower Your Business Growth"
  let description = "Take your small business to new heights by exploring innovative ideas and strategies. Our media collection provides insights to inspire and guide your journey forward."
  let isImageOnRight = false

  let backgroundStyle = {}

  if (isFunctionalMode) {
    isShowing = user?.isShowing?.value || true
    image = assetApiUrl + user?.image?.value?.url
    header = user?.header?.value
    description = user?.description?.value
    isImageOnRight = user?.isImageOnRight?.value

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
    <>
      {isShowing && (

        <section
          className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}
          style={backgroundStyle}
        >
          <div className={`${styles.container} ${isImageOnRight ? styles.flexRowReverse : styles.flexRow}`}>
            <div
              className={`${styles.imageSection} ${isImageOnRight ? styles.imageSectionReverse : ''}`}
              style={{ backgroundImage: `url("${image}")` }}
            ></div>
            <div className={`${styles.textSection} ${isImageOnRight ? styles.textSectionReverse : ''}`}>
              <h3 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>
                {header}
              </h3>
              <div
                className={`${styles.text} ${isNightMode ? styles.textNight : ''}`}
                dangerouslySetInnerHTML={{ __html: description }}
              >
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HalfImageHalfParagraph;
