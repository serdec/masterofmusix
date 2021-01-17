import React, { useState, useEffect } from 'react';
import { object, array, func, number } from 'prop-types';
import styles from './quizcard.module.css';

const noop = () => {};
const QuizCard = ({
  choices = [],
  track = {},
  onChoice = noop,
  secondPerQuiz = 10,
} = {}) => {
  const [countdown, setCountdown] = useState();

  /*
   * Set up the countdown
   */
  useEffect(() => {
    startCountdown();
    const timerId = setInterval(
      () => setCountdown((countdown) => countdown - 1),
      1000
    );
    return () => clearInterval(timerId);
  }, []);

  /*
   * Check countdown state. If 0 move on;
   */
  useEffect(() => {
    if (countdown <= 0) {
      onChoice();
    }
  }, [countdown, onChoice]);

  const startCountdown = () => {
    setCountdown(secondPerQuiz);
  };

  return (
    <div className={styles.quizcard}>
      <div className={styles.quizcard__timeBar} />
      <div className={styles.quizcard__snippet}>
        Who sings &quot;{track.snippet}&quot;?
      </div>
      {choices.map((choice) => (
        <div
          className={styles.quizcard__choice}
          onClick={() => onChoice(choice)}
          key={choice}
        >
          {choice}
        </div>
      ))}
    </div>
  );
};

QuizCard.propTypes = {
  choices: array,
  track: object,
  onChoice: func,
  secondPerQuiz: number,
};
export default QuizCard;
