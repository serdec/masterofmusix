import { useEffect, useState } from 'react';
import { getUser, loginUser, logoutUser } from './user-apis';

const useUser = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(getUser());
  }, [user, setUser]);

  /*
   * Logs the user in in the react state and on local storage
   */
  const login = (user) => {
    console.log('logging user in');
    setUser(user);
    loginUser(user);
  };

  /*
   * Logs the user out from the react state and the local storage
   */
  const logout = () => {
    setUser('');
    logoutUser();
  };

  return { login, logout, user };
};

export default useUser;
