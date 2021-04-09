import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

const Navigation = () => {
  const router = useRouter();
  const [navToggle, setNavToggle] = useState(false);

  const onClickMovePage = useCallback(page => {
    router.push(page).then(() => window.scrollTo(0, 0));
  }, []);

  return (
    <NavigationWrapper>
      <NavigationList>
        <NavigationBtn onClick={() => setNavToggle(!navToggle)}>
          {navToggle ? <span>&#62;</span> : <span>&#60;</span>}
        </NavigationBtn>
        <NavigationItem toggle={navToggle} onClick={() => onClickMovePage('/simulation')}>
          메뉴고르기
        </NavigationItem>
        <NavigationItem toggle={navToggle} onClick={() => onClickMovePage('/mydelivery')}>
          마이딜리버리
        </NavigationItem>
      </NavigationList>
    </NavigationWrapper>
  );
};

const NavigationBtn = styled.div`
  cursor: pointer;
  display: none;
  position: absolute;

  width: 61px;
  height: 50px;
  padding: 15px;
  background-color: grey;

  top: 115%;

  justify-content: center;
  align-items: center;

  @media all and (max-width: 1200px) {
    width: 40px;
    display: flex;
  }
`;

const NavigationWrapper = styled.div`
  position: fixed;
  top: 20%;
  left: 0;

  display: flex;
`;

const NavigationList = styled.div`
  height: 400px;
  align-items: center;
  font-size: 25px;
`;
const NavigationItem = styled.div`
  position: relative;

  margin-bottom: 30px;

  height: 50%;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.2s;

  background-color: #fff;

  font-size: 20px;
  padding: 20px;
  width: 50px;

  &::after {
    content: '';
    display: inline-block;
    height: 100%;
    width: 100%;

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.4s;
    background-color: #fff;
  }

  &:hover {
    padding: 50px;
    width: 100x;
    font-size: 20px;
    transform: translateY(-0.3rem);
    box-shadow: 0 1rem 2rem black;

    &::after {
      transform: scaleX(1.4) scaleY(1.6);
      opacity: 0;
    }
  }

  @media all and (max-width: 1200px) {
    font-size: 0;
    width: 10px;
    ${props =>
      props.toggle &&
      css`
        padding: 15px;
        width: 60px;
        font-size: 20px;
        /* pointer-events: */
      `}
  }
`;

export default Navigation;
