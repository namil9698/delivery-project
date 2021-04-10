import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../components/Login';
import Layout from '../components/Layout';
import Popup from '../components/Popup';

const login = () => {
  const islodding = useSelector(state => state.user.lodding);
  return (
    <Layout>
      <Login />
      {islodding ? <Popup /> : ''}
    </Layout>
  );
};

export default login;
