import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../redux/store/configureStore';
import withReduxSaga from 'next-redux-saga';

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>delivery</title>
      </Head>
      <Component />
    </>
  );
};

App.prototype = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(App));
