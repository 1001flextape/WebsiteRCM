import React from 'react';
import styles from './GifHeader.module.css';

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

const GitHeader = ({ isImageOnRight, ...props }) => {
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
  let header = "Empower Your Business Growth"
  let description = "Take your small business to new heights by exploring innovative ideas and strategies. Our media collection provides insights to inspire and guide your journey forward."
  let buttonText = "Learn More"
  let image = "https://dsimple.com/wp-content/uploads/2017/03/redes-sociales-estrategia.gif"
  let imageAlt = "Animated Business Growth"

  let backgroundStyles = {}
  let buttonStyles = {}

  if (isFunctionalMode) {
    isShowing = user?.isShowing?.value || true;
    header = user?.header?.value
    description = user?.description?.value
    buttonText = user?.ctaButtonText?.value
    image = assetApiUrl + user?.image?.value?.url
    imageAlt = user?.image?.value?.alt

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


  //   backgroundColorDay: Object { type: "COLOR_SELECTION:V1", value: {…} }
  // backgroundColorNight: Object { type: "COLOR_SELECTION:V1", value: {…} }
  // ctaButtonColorDay: Object { type: "COLOR_SELECTION:V1", value: {…} }
  // ctaButtonColorNight: Object { type: "COLOR_SELECTION:V1", value: {…} }
  // ctaButtonLink: Object { type: "LINK_SELECTION:V1", value: "lk" }
  // ctaButtonText: Object { type: "YDOC:V1", value: "l" }
  // description: Object { type: "WYSIWYG:V1", value: {…} }
  // header: Object { type: "YDOC:V1", value: "hj" }
  // image: Object { type: "MEDIA_SELECTION:V1", value: {…} }
  // isShowing: Object { type: "SWITCH:V1", value: true }

  return (
    <>
      {isShowing && (
        <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`} style={backgroundStyles}>
          <div className={`${styles.container} ${isImageOnRight ? styles.flexRowReverse : styles.flexRow}`}>
            <div className={`${styles.imageContainer} ${isImageOnRight ? styles.imageContainerReverse : ''}`}>
              <img
                src={image}
                alt={imageAlt}
                className={styles.image}
              />
            </div>
            <div className={`${styles.textContainer} ${isImageOnRight ? styles.textContainerReverse : ''}`}>
              <h3 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>{header}</h3>
              <p
                className={`${styles.text} ${isNightMode ? styles.textNight : ''}`}
                dangerouslySetInnerHTML={{ __html: description }}
              >

              </p>
              <button className={styles.ctaButton} style={buttonStyles}>
                {buttonText}
              </button>
            </div>
          </div>
        </section>
      )}
    </>

  );
};

export default GitHeader;
