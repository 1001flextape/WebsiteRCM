import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import styles from './component.module.css';

const MainVimeoHeader = (props) => {
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
        title="Vimeo Video"
        width="100%"
        height="100%"
        src="https://player.vimeo.com/video/722605344?autoplay=1&loop=1&background=1"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        className={styles.videoBackground}
      ></iframe>

      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h1 className={styles.heading}>Empower Your Small Business</h1>
        <p className={styles.subheading}>Unlock success with tailored solutions and expert guidance.</p>
        <div className={styles.buttonContainer}>
          <a
            href="#cta"
            className={styles.ctaButton}
          >
            Get Started
          </a>
          <Button
            onClick={handleOpenModal}
            className={styles.watchButton}
          >
            Watch Video
          </Button>
        </div>
      </div>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div className={styles.modalContainer}>
          <iframe
            title="Vimeo Video"
            width="100%"
            height="100%"
            src="https://player.vimeo.com/video/722605344?autoplay=1&loop=1"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </section>
  );
};

export default MainVimeoHeader;
