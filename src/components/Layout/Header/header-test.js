import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import Header from './header';
import styles from './header.module.css';

describe('header', async (assert) => {
  const createHeader = () => render(<Header />);
  {
    const $ = createHeader();
    assert({
      given: 'no arguments',
      should: 'render the header',
      expected: 1,
      actual: $(`.${styles.header}`).length,
    });
  }
});
