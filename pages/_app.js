import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../redux/store/configureStore';
import withReduxSaga from 'next-redux-saga';
import { useSelector } from 'react-redux';
import Popup from '../components/Popup';

const App = ({ Component }) => {
  const islodding = useSelector(state => state.user.lodding);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>delivery</title>
      </Head>
      {islodding ? <Popup /> : <Component />}
    </>
  );
};

App.prototype = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(App));
