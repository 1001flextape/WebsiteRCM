import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import styles from './component.module.css';

const MainVideoHeader = (props) => {
  const { system } = props.data;
  const { isNightMode } = system.state;

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
      <iframe
        title="YouTube Video"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/PBQZe3Y-pi4?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&loop=1&modestbranding=1&rel=0&playlist=PBQZe3Y-pi4"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className={styles.video}
      ></iframe>

      <div className={styles.overlay}></div>

      <div className={`${styles.content} ${isNightMode ? styles.contentNight : ''}`}>
        <h1 className={styles.heading}>Empower Your Small Business</h1>
        <p className={styles.subheading}>Unlock success with tailored solutions and expert guidance.</p>
        <div className={styles.buttons}>
          <a href="#cta" className={styles.ctaButton}>Get Started</a>
          <Button onClick={handleOpenModal} className={styles.watchButton}>Watch Video</Button>
        </div>
      </div>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div className={styles.modalContainer}>
          <iframe
            title="YouTube Video"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/PBQZe3Y-pi4?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </section>
  );
};

export default MainVideoHeader;
