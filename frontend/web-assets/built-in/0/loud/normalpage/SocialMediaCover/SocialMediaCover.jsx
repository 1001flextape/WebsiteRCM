import React from 'react';
import styles from './SocialMediaCover.module.css';

const SocialMediaCover = (props) => {
  const { system } = props.data;
  const { isNightMode } = system.state;

  const backgroundImage = 'https://picsum.photos/800/400?random=1';
  const userPhoto = 'https://picsum.photos/100/100?random=2';
  const userName = 'John Doe';
  const userTag = 'johndoe123';
  const additionalInfo = 'Web Developer | Travel Enthusiast';

  return (
    <div className={`${styles.profile} ${isNightMode ? styles.profileNight : ''}`}>
      <div className={styles.cover} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={styles.overlay}></div>
        <div className={styles.userInfo}>
          <img src={userPhoto} alt={userName} className={styles.userPhoto} />
          <h2 className={`${styles.userName} ${isNightMode ? styles.userNameNight : ''}`}>{userName}</h2>
          <p className={`${styles.userTag} ${isNightMode ? styles.userTagNight : ''}`}>@{userTag}</p>
          <p className={`${styles.additionalInfo} ${isNightMode ? styles.additionalInfoNight : ''}`}>{additionalInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCover;
