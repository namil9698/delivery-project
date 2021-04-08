import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../redux/store/configureStore';
import withReduxSaga from 'next-redux-saga';
import { useSelector } from 'react-redux';
import Popup from '../components/Popup';
import Layout from '../components/Layout';
import '../public/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = ({ Component }) => {
  const islodding = useSelector(state => state.user.lodding);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>MyDelivery</title>
      </Head>

      {islodding ? (
        <>
          <Popup />
          <Layout>
            <Component />
          </Layout>
        </>
      ) : (
        <Layout>
          <Component />
        </Layout>
      )}
    </>
  );
};

App.prototype = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(App));
