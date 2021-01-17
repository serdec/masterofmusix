import React from 'react';
import { any } from 'prop-types';
import styles from './body.module.css';

const Body = ({ children } = {}) => (
  <div className={styles.body}>{children}</div>
);

Body.propTypes = {
  children: any,
};
export default Body;
