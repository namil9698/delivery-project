import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { loginRequest, logoutRequest } from '../redux/reducers/user';

const Login = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.user);

  const onClickLogin = useCallback(data => {
    dispatch(loginRequest(data));
  }, []);

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  return (
    <>
      <Main>
        <MainWrapper>
          {isLogin ? (
            <LoginBtn onClick={onClickLogout}>로그아웃</LoginBtn>
          ) : (
            <>
              <LoginBtn onClick={() => onClickLogin('google')}>구글</LoginBtn>
              <LoginBtn onClick={() => onClickLogin('anonymous')}>익명</LoginBtn>
            </>
          )}
        </MainWrapper>
      </Main>
    </>
  );
};

export default Login;

const LoginWrapper = styled.div``;

const Main = styled.div``;
const MainWrapper = styled.div``;

const LoginBtn = styled.div`
  cursor: pointer;
  width: 100px;
  height: 50px;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;
