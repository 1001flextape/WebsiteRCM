import React, { useState } from 'react';
import styles from './Gallery.module.css';

const Gallery = (props) => {
  const { system } = props.data;
  const { isNightMode } = system.state;

  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    'https://picsum.photos/800/600?sig=1',
    'https://picsum.photos/800/600?sig=2',
    'https://picsum.photos/800/600?sig=3',
    'https://picsum.photos/800/600?sig=4',
    'https://picsum.photos/800/600?sig=5',
    // Add more image URLs as needed
  ];

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
      <div className={styles.container}>
        <h3 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>Gallery</h3>
        <p className={`${styles.text} ${isNightMode ? styles.textNight : ''}`}>
          Explore a collection of beautiful images. Click on an image to view it in full size.
        </p>

        <div className={styles.grid}>
          {images.map((imageUrl, index) => (
            <div key={index} className={styles.imageContainer} onClick={() => openLightbox(index)}>
              <img
                src={imageUrl}
                alt={`Gallery Image ${index + 1}`}
                className={styles.image}
              />
            </div>
          ))}
        </div>

        {selectedImage !== null && (
          <div className={styles.lightboxOverlay}>
            <div className={styles.lightboxContent}>
              <img
                src={images[selectedImage]}
                alt={`Gallery Image ${selectedImage + 1}`}
                className={styles.lightboxImage}
              />
              <button
                onClick={closeLightbox}
                className={styles.closeButton}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
