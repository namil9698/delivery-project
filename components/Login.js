import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { logInRequest, logOutRequest } from '../redux/reducers/user';
import { logInAPI } from '../redux/sagas/user';

const Login = () => {
  const dispatch = useDispatch();

  const [loginEmail, setloginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const getEmail = useCallback(e => {
    setloginEmail(e.target.value);
  }, []);

  const getPassword = useCallback(e => {
    setLoginPassword(e.target.value);
  }, []);

  return (
    <>
      <Main>
        <MainWrapper>
          <LoginEmail placeholder="이메일" onChange={getEmail}></LoginEmail>
          <LoginPassword
            placeholder="비밀번호"
            type="password"
            onChange={getPassword}
          ></LoginPassword>
          <LoginBtn
            onClick={() => {
              dispatch(logInRequest());
            }}
          >
            로그인
          </LoginBtn>
          <LoginBtn
            onClick={() => {
              dispatch(logOutRequest());
            }}
          >
            로그아웃
          </LoginBtn>
        </MainWrapper>
      </Main>
      <SignUp>
        <SignUpWrapper></SignUpWrapper>
      </SignUp>
    </>
  );
};

export default Login;

const LoginWrapper = styled.div``;

const Main = styled.div``;
const MainWrapper = styled.div``;

const LoginEmail = styled.input``;
const LoginPassword = styled.input``;

const SignUp = styled.div``;
const SignUpWrapper = styled.div``;

const LoginBtn = styled.div`
  cursor: pointer;
  width: 100px;
  height: 50px;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;
