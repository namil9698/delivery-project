import React from 'react';

import Mydelivery from '../components/Mydelivery';
import Navigation from '../components/Navigation';
import { useSelector } from 'react-redux';

import Layout from '../components/Layout';
import Popup from '../components/Popup';

const mydelivery = () => {
  const { isLogin } = useSelector(state => state.user);
  const islodding = useSelector(state => state.user.lodding);

  return (
    <Layout>
      {isLogin ? <Mydelivery /> : ''}
      {islodding ? <Popup /> : ''}
      <Navigation />
    </Layout>
  );
};

export default mydelivery;
