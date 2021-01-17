import React from 'react';
import styles from './footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <a href="https://musixmatch.com" target="_blank" rel="noopener noreferrer">
      <img
        src="/badge.svg"
        alt="Musixmatch Logo"
        className={styles.footer__logo}
      />
    </a>
  </footer>
);

export default Footer;
