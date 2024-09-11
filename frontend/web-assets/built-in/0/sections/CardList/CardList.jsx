import React from 'react';
import styles from './CardList.module.css';

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

const CardList = (props) => {

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
  let header = "Card List"
  let description = "Discover our featured cards, each showcasing unique aspects of our offerings. Explore the details and find the perfect fit for your needs."

  const cardData = [
    {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://picsum.photos/300/200?sig=1',
    },
    {
      description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      imageUrl: 'https://picsum.photos/300/200?sig=2',
    },
    {
      description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
      imageUrl: 'https://picsum.photos/300/200?sig=3',
    },
    {
      description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
      imageUrl: 'https://picsum.photos/300/200?sig=4',
    },
    {
      description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
      imageUrl: 'https://picsum.photos/300/200?sig=5',
    },
    // Add more cards as needed
  ];


  let backgroundStyle = {}

  if (isFunctionalMode) {
    isShowing = user?.isShowing?.value || true
    header = user?.header?.value
    description = user?.description?.value?.html


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
          <div className={styles.container}>
            <div>
              <h3 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>{header}</h3>
              <div
                className={`${styles.description} ${isNightMode ? styles.descriptionNight : ''}`}
                dangerouslySetInnerHTML={{ __html: description }}
              >
              </div>
            </div>
            <div className={styles.cardWrapper}>
              {cardData.map((card, index) => (
                <div key={index} className={styles.cardContainer}>
                  <div className={`${styles.card} ${isNightMode ? styles.cardNight : ''}`}>
                    <img src={card.imageUrl} alt={`Card ${index + 1}`} className={styles.cardImage} />
                    <div className={styles.cardContent}>
                      <p className={`${styles.cardDescription} ${isNightMode ? styles.cardDescriptionNight : ''}`}>{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CardList;
