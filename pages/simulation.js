import React from 'react';
import Simulation from '../components/Simulation';
import Navigation from '../components/Navigation';
import { useSelector } from 'react-redux';

import Layout from '../components/Layout';
import Popup from '../components/Popup';

const simulation = () => {
  const islodding = useSelector(state => state.user.lodding);
  return (
    <Layout>
      <Simulation />
      {islodding ? <Popup /> : ''}
      <Navigation />
    </Layout>
  );
};

export default simulation;
