import React, { useEffect, useState } from 'react';
import { string, func, array } from 'prop-types';
import Head from 'next/head';
import styles from '../../../styles/Home.module.css';
import QuizGame from '../QuizGame/quizgame';
import { getUser, initLocalStorage, loginUser } from '../../libs/user-apis';

const noop = () => { };

const App = ({ user = '', login = noop, tracks = [] } = {}) => {
  const [inputValue, setValue] = useState('');
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const numberOfQuizzes = 10;
  const secondsPerQuiz = 10;

  /*
   * Check if the local storage is initialized,
   * If a user is already logged in, set it in
   * the React state as well
   */
  useEffect(() => {
    initLocalStorage();
    setLoading(false);
  }, []);

  useEffect(() => {
    setValue('');
  }, []);

  const handleLogin = (user) => {
    console.log('handling login');
    login(user);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Become the Master of Musix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
            <main className={styles.main}>
              <h1 className={styles.title}>Welcome to MasterOfMusix</h1>
              <p className={styles.description}>
                You have {secondsPerQuiz} seconds to answer each quiz. The game
              ends after {numberOfQuizzes} quizzes
            </p>
              {user ? (
                <>
                  {playing ? (
                    <QuizGame
                      user={user}
                      tracks={tracks}
                      numberOfQuizzes={numberOfQuizzes}
                      secondsPerQuiz={secondsPerQuiz}
                    />
                  ) : (
                      <div className={styles.grid}>
                        <button
                          onClick={() => setPlaying(true)}
                          className={styles.card}
                        >
                          <h3>Start</h3>
                        </button>
                      </div>
                    )}
                </>
              ) : (
                  <div>
                    <input
                      placeholder="Enter your name..."
                      value={inputValue}
                      onChange={(e) => {
                        const value = e.target.value;
                        setValue(value);
                      }}
                    />
                    <button onClick={() => handleLogin(inputValue)}>Login</button>
                  </div>
                )}
            </main>
          )}
      </>
    </div>
  );
};

App.propTypes = {
  user: string,
  login: func,
  tracks: array,
};
export default App;
