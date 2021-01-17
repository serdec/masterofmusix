import React from 'react';
import { string, func } from 'prop-types';
import styles from './header.module.css';
import { useRouter } from 'next/router';

const noop = () => { };

const Header = ({ user = '', logout = noop } = {}) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
    logout();
  };
  return (
    <nav className={styles.header}>
      <div className={styles.header__pagesLinks}>
        <div className={styles.header__pageLink}>
          <a href="/">Home</a>
        </div>
        <div className={styles.header__pageLink}>
          <a href="/best">HighScores</a>
        </div>
      </div>
      <div>
        {user && (
          <div className={styles.header__userInfo}>
            <a href={`/profile/${user}`} className={styles.header__userName}>
              {user}
            </a>
            <button className={styles.header__button} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

Header.propTypes = {
  user: string,
  logout: func,
};

export default Header;
