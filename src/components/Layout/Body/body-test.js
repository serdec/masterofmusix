import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import Body from './body.js';
import styles from './body.module.css';

describe('body', async (assert) => {
  const createContent = () => render(<Body />);

  {
    const $ = createContent();
    assert({
      given: 'no arguments',
      should: 'render the body component',
      expected: 1,
      actual: $(`.${styles.body}`).length,
    });
  }
});
