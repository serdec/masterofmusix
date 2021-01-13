import React from 'react';
import PropTypes from 'prop-types';
import { wrapper } from '../store/store';

import '../../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default wrapper.withRedux(MyApp);
