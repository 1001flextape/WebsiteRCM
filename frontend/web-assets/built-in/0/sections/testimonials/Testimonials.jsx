import React from 'react';
import styles from './Testimonials.module.css'; // Updated file name

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

const Testimonials = (props) => {

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
  let header = "What People Are Saying"

  const testimonialsData = [
    {
      id: 1,
      name: 'John Doe',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  let backgroundStyle = {}

  if (isFunctionalMode) {
    isShowing = user?.isShowing?.value || true
    header = user?.header?.value

    backgroundStyle = {
      backgroundColor: isNightMode
        ? user?.backgroundColorNight?.value?.color
        : user?.backgroundColorDay?.value?.color,
      color: isNightMode
        ? getTextColor(user?.backgroundColorNight?.value?.suggestedTextColor)
        : getTextColor(user?.backgroundColorDay?.value?.suggestedTextColor),
    }
  }


  const sectionClass = isNightMode ? styles.sectionNight : styles.section;
  const headingClass = isNightMode ? styles.headingNight : styles.heading;
  const testimonialClass = isNightMode ? styles.testimonialNight : styles.testimonial;
  const textClass = isNightMode ? styles.textNight : styles.text;
  const nameClass = isNightMode ? styles.nameNight : styles.name;

  return (
    <>
      {isShowing && (

        <section
          className={sectionClass}
          style={backgroundStyle}>
          <div className={styles.container}>
            <h3 className={headingClass}>{header}</h3>

            <div className={styles.testimonials}>
              {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className={testimonialClass}>
                  <p className={textClass}>{testimonial.text}</p>
                  <p className={nameClass}>{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>

  );
};

export default Testimonials;
