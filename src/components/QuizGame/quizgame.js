import React, { useEffect, useState } from 'react';
import { string, array, number } from 'prop-types';
import sampleSize from 'lodash.samplesize';
import sample from 'lodash.sample';
import shuffle from 'lodash.shuffle';

import QuizCard from '../../components/QuizCard/quizcard';
import { saveScore as saveScore } from '../../libs/user-apis';
import styles from '../../../styles/Home.module.css';

const QuizGame = ({
  user = '',
  tracks = [],
  numberOfArtistsChoices = 3,
  numberOfQuizzes = 10,
  secondsPerQuiz = 10,
  pointsPerQuiz = 10,
} = {}) => {
  const [step, setStep] = useState(0);
  const [quizTracks, setQuizTracks] = useState([]);
  const [score, setScore] = useState(0);
  const [artists, setArtists] = useState([]);
  const [init, setInit] = useState(true);

  const nextStep = () => setStep((step) => step + 1);

  /*
   * Chose the tracks to play
   */
  useEffect(() => {
    setQuizTracks(sampleSize(tracks, numberOfQuizzes));
    setInit(false);
  }, [tracks, numberOfQuizzes, init]);

  /*
   * The score state prop is updated asynchronously
   * therefore we need to save the score on localstorage
   * whenever it is update in the React state
   */
  useEffect(() => {
    saveScore({ user, score });
  }, [score, user]);

  /*
   * For each quiz select numberOfArtistsChoices
   * as possible answers to the quiz
   */
  useEffect(() => {
    if (quizTracks[step]) {
      const pickRandomArtists = () => {
        const artistsChoices = [quizTracks[step].artist];
        while (artistsChoices.length < numberOfArtistsChoices) {
          const sampleArtist = sample(tracks).artist;
          if (!artistsChoices.includes(sampleArtist)) {
            artistsChoices.push(sampleArtist);
          }
        }
        return shuffle(artistsChoices);
      };
      setArtists(pickRandomArtists());
    }
  }, [step, quizTracks, tracks, numberOfQuizzes, numberOfArtistsChoices]);

  const isCorrectChoice = (choice = '') => {
    return choice === quizTracks[step].artist;
  };

  /*
   * Whenever a choice is made,
   * check if it is correct and go to the next quiz
   */
  const handleChoice = (choice = '') => {
    if (isCorrectChoice(choice)) {
      setScore((score) => score + pointsPerQuiz);
    }
    nextStep();
  };

  return (
    <>
      {quizTracks[step] && (
        <div>
          <QuizCard
            key={quizTracks[step].id}
            choices={artists}
            track={quizTracks[step]}
            onChoice={handleChoice}
            secondsPerQuiz={secondsPerQuiz}
          />
        </div>
      )}
      {step === numberOfQuizzes && (
        <div>
          {' '}
          <div>Your total score is {score}</div>
          <button
            className={styles.card}
            onClick={() => {
              setInit(true);
              setScore(0);
              setStep(0);
            }}
          >
            <h3>Restart</h3>
          </button>
        </div>
      )}
    </>
  );
};

QuizGame.propTypes = {
  user: string,
  tracks: array,
  numberOfArtistsChoices: number,
  numberOfQuizzes: number,
  secondsPerQuiz: number,
  pointsPerQuiz: number,
};

export default QuizGame;
