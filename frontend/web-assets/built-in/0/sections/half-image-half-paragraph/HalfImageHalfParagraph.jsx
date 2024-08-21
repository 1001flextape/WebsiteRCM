import React from 'react';
import styles from './HalfImageHalfParagraph.module.css';

const HalfImageHalfParagraph = ({ isImageOnRight = false, data }) => {
  const { system } = data;
  const { isNightMode } = system.state;

  const randomImage = `https://picsum.photos/400/400?sig=${Math.floor(Math.random() * 1000)}`;

  return (
    <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
      <div className={`${styles.container} ${isImageOnRight ? styles.flexRowReverse : styles.flexRow}`}>
        <div
          className={`${styles.imageSection} ${isImageOnRight ? styles.imageSectionReverse : ''}`}
          style={{ backgroundImage: `url("${randomImage}")` }}
        ></div>
        <div className={`${styles.textSection} ${isImageOnRight ? styles.textSectionReverse : ''}`}>
          <h3 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>Empower Your Business Growth</h3>
          <p className={`${styles.text} ${isNightMode ? styles.textNight : ''}`}>
            Take your small business to new heights by exploring innovative ideas and strategies. Our media collection provides insights to inspire and guide your journey forward.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HalfImageHalfParagraph;
