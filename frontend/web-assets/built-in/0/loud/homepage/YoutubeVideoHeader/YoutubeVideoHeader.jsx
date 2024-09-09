import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import styles from './YoutubeVideoHeader.module.css';

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

const YoutubeVideoHeader = (props) => {
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
  let videoId = "PBQZe3Y-pi4"
  let header = "Empower Your Small Business"
  let description = "Unlock success with tailored solutions and expert guidance."
  let buttonText = "Get Started"
  let buttonLink;

  // styles
  let buttonStyles = {}
  let watchStyles = {}

  // init
  if (isFunctionalMode) {
    isShowing = user?.isShowing?.value || true
    videoId = user?.youtubeVideoId?.value
    header = user?.header?.value
    description = user?.description?.value
    buttonText = user?.ctaButtonText?.value
    buttonLink = user?.ctaButtonLink?.value

    buttonStyles = {
      backgroundColor: isNightMode
        ? user?.ctaButtonColorNight?.value?.color
        : user?.ctaButtonColorDay?.value?.color,
      color: isNightMode
        ? getTextColor(user?.ctaButtonColorNight?.value?.suggestedTextColor)
        : getTextColor(user?.ctaButtonColorDay?.value?.suggestedTextColor),
    }

    watchStyles = {
      color: isNightMode
        ? user?.ctaButtonColorNight?.value?.color
        : user?.ctaButtonColorDay?.value?.color,
    }
  }



  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {isShowing && (
        <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
          {videoId && (
            <iframe
              title="YouTube Video"
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&loop=1&modestbranding=1&rel=0&playlist=PBQZe3Y-pi4`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className={styles.video}
            ></iframe>
          )}

          <div className={styles.overlay}></div>

          <div className={`${styles.content} ${isNightMode ? styles.contentNight : ''}`}>
            <h1 className={styles.heading}>{header}</h1>
            <p
              dangerouslySetInnerHTML={{ __html: description }}
              style={{ paddingBottom: "5px" }}
            ></p>
            <div className={styles.buttons}>
              <a href="#cta"
                className={styles.ctaButton}
                style={buttonStyles}
                onClick={isProdMode
                  ? navigate(buttonLink)
                  : () => { }
                }
              >
                {buttonText}
              </a>
              <Button
                onClick={handleOpenModal}
                className={styles.watchButton}
                style={watchStyles}
              >
                Watch Video
              </Button>
            </div>
          </div>

          <Modal open={modalOpen} onClose={handleCloseModal}>
            <div className={styles.modalContainer}>
              {videoId && (
                <iframe
                  title="YouTube Video"
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </Modal>
        </section>
      )}
    </>
  );
};

export default YoutubeVideoHeader;
