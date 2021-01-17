import best from '../pages/best';

const STORAGE_KEY = '__MASTEROFMUSIX__';

const initialState = () => ({ loggedUser: '', scores: {} });

const getJsonLocalStorage = () => {
  if (typeof localStorage !== 'undefined')
    return JSON.parse(localStorage.getItem(STORAGE_KEY));

  return initialState();
};
export const initLocalStorage = () => {
  if (typeof localStorage !== 'undefined') {
    const storageState = localStorage.getItem(STORAGE_KEY);
    if (!storageState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState()));
    }
  }
};

export const loginUser = (user) => {
  const storageState = getJsonLocalStorage();
  storageState.loggedUser = user;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...storageState,
    })
  );
};
export const logoutUser = () => {
  loginUser('');
};
export const getUser = () => {
  const storageState = getJsonLocalStorage();
  return storageState.loggedUser;
};

export const saveScore = ({ user, score }) => {
  const storageState = getJsonLocalStorage();

  let { [user]: u } = storageState.scores;
  if (!u) {
    u = {};
    u.score = 0;
  }
  if (u.score < score) u.score = score;
  const newScores = { ...storageState.scores, [user]: u };
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...storageState,
      scores: newScores,
    })
  );
};

export const getAllScores = () => {
  const storageState = getJsonLocalStorage();
  return storageState.scores;
};

export const getUserScore = (user) => {
  const scores = getAllScores();
  console.log({ scores });
  try {
    return scores[user].score;
  } catch (e) {
    return 0;
  }
};

export const getBestScores = (n = 10) => {
  const storageState = getJsonLocalStorage();
  const userScores = storageState.scores;

  const bestScores = Object.entries(userScores).sort(
    (a, b) => b[1].score - a[1].score
  );

  return bestScores
    .slice(0, n)
    .map((entry) => ({ name: entry[0], score: entry[1].score }));
};
