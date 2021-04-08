import React, { useEffect } from 'react';
import Simulation from '../components/Simulation';
import Navigation from '../components/Navigation';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const simulation = () => {
  const router = useRouter();
  const { isLogin } = useSelector(state => state.user);
  // useEffect(() => {
  //   if (!isLogin) {
  //     alert('로그인이 필요한 서비스입니다..');
  //     router.push('/').then(() => window.scrollTo(0, 0));
  //   }
  // }, [isLogin]);
  return (
    <>
      <Simulation />
      <Navigation />
    </>
  );
};

export default simulation;
