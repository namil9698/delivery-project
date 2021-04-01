import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loginRequest, logoutRequest } from '../redux/reducers/user';
import Link from 'next/link';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLogin } = useSelector(state => state.user);

  const onClickLogin = useCallback(data => {
    dispatch(loginRequest(data));
    router.push('/simulation').then(() => window.scrollTo(0, 0));
  }, []);

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  return (
    <>
      {isLogin ? (
        <LoginButton onClick={onClickLogout}>로그아웃</LoginButton>
      ) : (
        <>
          <LoginWrapper>
            <LoginButton>
              <Button>
                <ButtonImg onClick={() => onClickLogin('google')} className="google">
                  <Img src="/images/login_google.png" />
                  <Text>구글로 로그인</Text>
                </ButtonImg>

                <ButtonImg onClick={() => onClickLogin('anonymous')} className="anonymous">
                  <Img src="/images/login_anonymous.png" />
                  <Text>비회원 로그인</Text>
                </ButtonImg>
              </Button>
            </LoginButton>
          </LoginWrapper>
        </>
      )}
    </>
  );
};

export default Login;

const LoginWrapper = styled.div`
  overflow-x: hidden;
`;

const LoginButton = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  margin: 0 auto;
  width: 70vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media all and (max-width: 1100px) {
    width: 100%;
    height: 500px;
    flex-direction: column;
    justify-content: center;
  }
`;

const ButtonImg = styled.div`
  position: relative;
  cursor: pointer;
  width: 30vw;

  height: calc(30vw * 0.75);

  border-radius: 20%;
  transition: all 0.3s ease;

  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);

  & :hover {
    transform: translate(5%, 5%);
    box-shadow: none;
  }

  &.google {
    background: linear-gradient(to bottom, rgba(73, 155, 234, 1) 0%, rgba(32, 124, 229, 1) 100%);
  }

  &.anonymous {
    background: linear-gradient(to bottom, rgba(255, 0, 132, 1) 0%, rgba(255, 0, 132, 1) 100%);
  }

  @media all and (max-width: 1100px) {
    border-radius: 0;
    width: 100%;
    height: calc(100vw * 0.75);
    box-shadow: none;
    &:hover {
      transform: none;
    }
  }
`;
const Img = styled.div`
  background-image: url(${props => props.src});
  background-size: 100% 100%;
  width: 100%;
  height: 100%;

  @media all and (max-width: 1100px) {
    background-size: contain;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
`;

const Text = styled.p`
  position: absolute;
  white-space: nowrap;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: 'InkLipquid';
  font-size: 5vw;
  font-weight: 800;
  color: #fff;
  text-shadow: 5px 5px #000;

  @media all and (max-width: 1100px) {
    font-size: 50px;
  }
`;
