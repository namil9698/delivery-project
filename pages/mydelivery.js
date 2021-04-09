import React from 'react';
import Mydelivery from '../components/Mydelivery';
import Navigation from '../components/Navigation';
import { useSelector } from 'react-redux';

const mydelivery = () => {
  const { isLogin } = useSelector(state => state.user);

  return (
    <>
      {isLogin ? (
        <>
          <Mydelivery />
          <Navigation />
        </>
      ) : (
        <Navigation />
      )}
    </>
  );
};

export default mydelivery;
