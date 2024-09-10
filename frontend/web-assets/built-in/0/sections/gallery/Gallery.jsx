import React, { useState } from 'react';
import styles from './Gallery.module.css';

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

const Gallery = (props) => {

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
  let header = "Gallery"
  let description = "Explore a collection of beautiful images. Click on an image to view it in full size."
  const images = [
    'https://picsum.photos/800/600?sig=1',
    'https://picsum.photos/800/600?sig=2',
    'https://picsum.photos/800/600?sig=3',
    'https://picsum.photos/800/600?sig=4',
    'https://picsum.photos/800/600?sig=5',
    // Add more image URLs as needed
  ];

  let backgroundStyle = {}

  if (isFunctionalMode) {
    isShowing = user?.isShowing?.value || true
    header = user?.header?.value
    description = user?.description?.value


    backgroundStyle = {
      backgroundColor: isNightMode
        ? user?.backgroundColorNight?.value?.color
        : user?.backgroundColorDay?.value?.color,
      color: isNightMode
        ? getTextColor(user?.backgroundColorNight?.value?.suggestedTextColor)
        : getTextColor(user?.backgroundColorDay?.value?.suggestedTextColor),
    }
  }

  const [selectedImage, setSelectedImage] = useState(null);


  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {isShowing && (

        <section
          className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}
          style={backgroundStyle}
        >
          <div className={styles.container}>
            <h3 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>
              {header}
            </h3>
            <div
              className={`${styles.text} ${isNightMode ? styles.textNight : ''}`}
              dangerouslySetInnerHTML={{ __html: description }}
            >

            </div>

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
      )}
    </>
  );
};

export default Gallery;
