import React from 'react';
import styles from './GifHeader.module.css';

const MediaParagraphSection = ({ isImageOnRight = true, data }) => {
  const { system } = data;
  const { isNightMode } = system.state;

  return (
    <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
      <div className={`${styles.container} ${isImageOnRight ? styles.flexRowReverse : styles.flexRow}`}>
        <div className={`${styles.imageContainer} ${isImageOnRight ? styles.imageContainerReverse : ''}`}>
          <img
            src="https://dsimple.com/wp-content/uploads/2017/03/redes-sociales-estrategia.gif"
            alt="Animated Business Growth"
            className={styles.image}
          />
        </div>
        <div className={`${styles.textContainer} ${isImageOnRight ? styles.textContainerReverse : ''}`}>
          <h3 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>Empower Your Business Growth</h3>
          <p className={`${styles.text} ${isNightMode ? styles.textNight : ''}`}>
            Take your small business to new heights by exploring innovative ideas and strategies. Our media collection provides insights to inspire and guide your journey forward.
          </p>
          <button className={styles.ctaButton}>
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default MediaParagraphSection;
