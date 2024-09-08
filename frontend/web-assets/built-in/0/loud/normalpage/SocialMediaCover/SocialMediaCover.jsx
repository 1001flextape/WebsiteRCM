import React from 'react';
import styles from './SocialMediaCover.module.css';

const SocialMediaCover = (props) => {
  const { system, user } = props.data;
  const {
    isDayMode,
    isNightMode,
    isDisplayMode,
    isFunctionalMode,
    assetApiUrl,
  } = system.state;

  let isShowing = true;
  let backgroundImage = 'https://picsum.photos/800/400?random=1';
  let userPhoto = 'https://picsum.photos/100/100?random=2';
  let userName = 'John Doe';
  let title1 = 'Web Developer';
  let title2 = 'Travel Enthusiast';

  if (isFunctionalMode) {
    console.log('system.state', system.state)
    isShowing = user?.isShowing.value || true
    backgroundImage = user?.coverImage?.value?.url ? assetApiUrl + user.coverImage.value.url : undefined
    userPhoto = user?.profileImage?.value?.url ? assetApiUrl + user.profileImage.value.url : undefined
    userName = user?.header?.value
    title1 = user?.title1?.value
    title2 = user?.title2?.value
  }

  return (
    <>
      {isShowing && (
        <div className={`${styles.profile} ${isNightMode ? styles.profileNight : ''}`}>
          <div className={styles.cover} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className={styles.overlay}></div>
            <div className={styles.userInfo}>
              <img src={userPhoto} alt={userName} className={styles.userPhoto} />
              <h2 className={`${styles.userName} ${isNightMode ? styles.userNameNight : ''}`}>{userName}</h2>
              <p className={`${styles.additionalInfo} ${isNightMode ? styles.additionalInfoNight : ''}`}>
                {title1}
                {title2 && (` | ${title2}`)}

              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialMediaCover;
