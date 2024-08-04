import React from 'react';
import styles from './component.module.css';

const TopThreeHighlights = (props) => {
  const { system } = props.data;
  const { isNightMode } = system.state;

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

  return (
    <section className={isNightMode ? styles.sectionNight : styles.section}>
      <div className={styles.container}>
        <h3 className={isNightMode ? styles.headingNight : styles.heading}>Why Choose Us?</h3>
        <p className={isNightMode ? styles.descriptionNight : styles.description}>
          Explore the key reasons to choose us. From exceptional service to swift delivery and dedicated customer satisfaction, we're committed to exceeding your expectations.
        </p>

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
