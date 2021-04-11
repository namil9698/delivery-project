import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../redux/store/configureStore';
import withReduxSaga from 'next-redux-saga';
import '../public/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>MyDelivery</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

App.prototype = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(App));
