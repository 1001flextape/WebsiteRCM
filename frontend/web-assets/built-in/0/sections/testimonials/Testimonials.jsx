import React from 'react';
import styles from './Testimonials.module.css'; // Updated file name

const Testimonials = (props) => {
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

  const { system } = props.data;
  const { isNightMode } = system.state;

  const sectionClass = isNightMode ? styles.sectionNight : styles.section;
  const headingClass = isNightMode ? styles.headingNight : styles.heading;
  const testimonialClass = isNightMode ? styles.testimonialNight : styles.testimonial;
  const textClass = isNightMode ? styles.textNight : styles.text;
  const nameClass = isNightMode ? styles.nameNight : styles.name;

  return (
    <section className={sectionClass}>
      <div className={styles.container}>
        <h3 className={headingClass}>What People Are Saying</h3>

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
  );
};

export default Testimonials;
