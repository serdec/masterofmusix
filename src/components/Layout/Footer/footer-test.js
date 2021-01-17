import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import Footer from './footer';
import styles from './footer.module.css';

describe('footer', async (assert) => {
  const createFooter = () => render(<Footer />);
  {
    const $ = createFooter();
    assert({
      given: 'no arguments',
      should: 'render the footer',
      expected: 1,
      actual: $(`.${styles.footer}`).length,
    });
  }
});
