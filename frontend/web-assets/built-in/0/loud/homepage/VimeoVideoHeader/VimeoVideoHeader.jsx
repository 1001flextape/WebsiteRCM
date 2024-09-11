// ./VimeoVideoHeader.jsx
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import styles from './VimeoVideoHeader.module.css';

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

const VimeoVideoHeader = (props) => {
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
  let videoId = "722605344"
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
    videoId = user?.vimeoVideoId?.value
    header = user?.header?.value
    description = user?.description?.value?.html
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

  //   ctaButtonColorDay: Object { type: "COLOR_SELECTION:V1", value: {…} }
  // ctaButtonColorNight: Object { type: "COLOR_SELECTION:V1", value: {…} }
  // ctaButtonLink: Object { type: "LINK_SELECTION:V1", value: "/portal/dashboard/" }
  // ctaButtonText: Object { type: "YDOC:V1", value: "asdf" }
  // isShowing: Object { type: "SWITCH:V1", value: true }
  // vimeoVideoId: Object { type: "YDOC:V1", value: "asdf" }
  // header: Object { type: "YDOC:V1", value: "asdf" }
  // description: Object { type: "WYSIWYG:V1", value: {…} }

  return (
    <>
      {isShowing && (
        <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
          {videoId && (
            <iframe
              title="Vimeo Video"
              width="100%"
              height="100%"
              src={`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&background=1`}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              className={styles.videoBackground}
            ></iframe>
          )}

          <div className={styles.overlay}></div>

          <div className={styles.content}>
            <h1 className={styles.heading}>{header}</h1>
            <p
              className={styles.subheading}
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
            <div className={styles.buttonContainer}>
              <a
                href="#cta"
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
                  title="Vimeo Video"
                  width="100%"
                  height="100%"
                  src={`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`}
                  frameBorder="0"
                  allow="autoplay; fullscreen"
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

export default VimeoVideoHeader;
