import React, { useState } from 'react';
import styles from './component.module.css';

const LoudSection = (props) => {
  const { system } = props.data;
  const { isNightMode } = system.state;

  const questions = [
    {
      question: "How can a small business owner build a strong online presence?",
      answer:
        "Crafting an engaging website, leveraging social media platforms, and optimizing for local search are powerful ways for small business owners to establish a robust online presence. Connecting with the digital audience opens doors to new customers and opportunities.",
    },
    {
      question: "What marketing tactics can a local business use to stand out?",
      answer:
        "Local businesses thrive by embracing creative marketing tactics. Engaging with the community through events, offering exclusive promotions, and collaborating with other local businesses create a memorable and standout presence.",
    },
    {
      question: "How does excellent customer service impact small businesses?",
      answer:
        "Exceptional customer service is the secret sauce for small business success. Building strong relationships, addressing customer needs with care, and going the extra mile not only foster customer loyalty but also generate positive word-of-mouth referrals.",
    },
    {
      question: "What financial strategies contribute to the growth of a small business?",
      answer:
        "Small business growth is fueled by sound financial strategies. Implementing budgeting, tracking key financial metrics, and exploring funding options set the stage for sustainable growth and financial prosperity.",
    },
    {
      question: "How can small business owners adapt to changing market trends?",
      answer:
        "Navigating market changes requires small business owners to stay agile. Keeping a pulse on industry trends, gathering customer feedback, and embracing innovation allow them to adapt, evolve, and seize new opportunities in a dynamic market.",
    }
  ];

  const [expandedIndices, setExpandedIndices] = useState([]);

  const handleToggle = (index) => {
    setExpandedIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  return (
    <section className={`${styles.section} ${isNightMode ? styles.sectionNight : ''}`}>
      <div className={styles.container}>
        <h3 className={`${styles.heading} ${isNightMode ? styles.headingNight : ''}`}>Questions and Answers</h3>
        {questions.map((item, index) => (
          <div
            key={index}
            className={`${styles.accordion} ${isNightMode ? styles.accordionNight : ''}`}
            onClick={() => handleToggle(index)}
          >
            <div className={styles.accordionSummary}>
              <h3 className={`${styles.question} ${isNightMode ? styles.questionNight : ''}`}>{item.question}</h3>
              <span className={`${styles.icon} ${isNightMode ? styles.iconNight : ''}`}>{expandedIndices.includes(index) ? '▲' : '▼'}</span>
            </div>
            {expandedIndices.includes(index) && (
              <div className={`${styles.answer} ${isNightMode ? styles.answerNight : ''}`}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoudSection;
