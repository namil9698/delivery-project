import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loginRequest } from '../redux/reducers/user';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLogin } = useSelector(state => state.user);

  //로그인 여부 체크, 로그인 성공 or 현재 로그인중일경우
  useEffect(() => {
    if (isLogin) {
      router.push('/simulation').then(() => window.scrollTo(0, 0));
    }
  }, [isLogin]);

  //로그인
  const onClickLogin = data => {
    dispatch(loginRequest(data));
  };

  return (
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
  );
};

export default Login;

const LoginButton = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media all and (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }
`;

const ButtonImg = styled.div`
  position: relative;
  cursor: pointer;
  width: 550px;

  height: calc(550px * 0.75);

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

  @media all and (max-width: 1200px) {
    border-radius: 0;
    width: 100%;
    height: 50vh;
    box-shadow: none;

    display: flex;
    justify-content: center;
    align-items: center;
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

  @media all and (max-width: 1200px) {
    width: 320px;
    height: calc(320px * 0.75);
    background-size: 100% 100%;
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
  font-size: 100px;
  font-weight: 800;
  color: #fff;
  text-shadow: 5px 5px #000;

  @media all and (max-width: 1200px) {
    font-size: 50px;
  }
`;
