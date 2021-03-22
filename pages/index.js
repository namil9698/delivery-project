import React, { useEffect } from 'react';
import Simulation from '../components/Simulation';
import Login from '../components/Login';
import Mydelivery from '../components/Mydelivery';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDataRequest } from '../redux/reducers/user';

const index = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    if (user.isLogin) {
      dispatch(getUserDataRequest(user.user));
    }
  }, [user.isLogin]);
  return (
    <>
      <Login />
      <Simulation />
      <Mydelivery />
    </>
  );
};

export default index;
