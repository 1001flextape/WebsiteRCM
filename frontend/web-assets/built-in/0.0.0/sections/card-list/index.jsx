import React from 'react';
import styles from './component.module.css';

const CardList = (props) => {
  const { system } = props.data;
  const { isNightMode } = system.state;

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

  return (
    <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h3 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>Card List</h3>
          <p className={`${styles.description} ${isNightMode ? styles.descriptionNight : ''}`}>
            Discover our featured cards, each showcasing unique aspects of our offerings. Explore the details and find the perfect fit for your needs.
          </p>
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
  );
};

export default CardList;
