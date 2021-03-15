import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const getInputId = useCallback(e => {
    setLoginId(e.target.value);
  }, []);

  const getInputPassword = useCallback(e => {
    setLoginPassword(e.target.value);
  }, []);

  return (
    <>
      <Main>
        <MainWrapper>
          <LoginId placeholder="아이디" onChange={getInputId}></LoginId>
          <LoginPassword
            placeholder="비밀번호"
            type="password"
            onChange={getInputPassword}
          ></LoginPassword>
          <LoginBtn>로그인</LoginBtn>
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

const LoginId = styled.input``;
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
