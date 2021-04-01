import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Link from 'next/link';

const index = () => {
  return (
    <HomeWrapper>
      <HomeBanner>
        <Banner>
          <BannerTitle>
            <Title>My Delivery</Title>
          </BannerTitle>
          <BannerImg>
            <Img className="home_img" />
          </BannerImg>
          <Link href="/login">
            <BannerBtn>Click !</BannerBtn>
          </Link>
        </Banner>
      </HomeBanner>
    </HomeWrapper>
  );
};

export default index;

const MoveUp = keyframes`

 0% {
  opacity: 0;
   transform:translateY(3vh);
 }
 50% {
   transform:translateY(1.5vh);
 }
100% {
  opacity: 1;
   transform:translateY(0);
}
`;

const HomeWrapper = styled.div`
  overflow-x: hidden;
`;

const HomeBanner = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  position: relative;
  animation: ${MoveUp} 1s linear;

  width: 50vw;
  height: 50vw;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  background: rgba(241, 231, 103, 1);
  background: linear-gradient(to right, rgba(241, 231, 103, 1) 0%, rgba(254, 182, 69, 1) 100%);

  &:hover {
    cursor: pointer;
    & .home_img {
      background-image: url('/images/home_img_hover.png');
    }
  }

  @media all and (max-width: 1100px) {
    border-radius: 0%;
    width: 100%;
    height: 800px;
  }
`;

const BannerTitle = styled.div`
  position: absolute;
  z-index: 3;

  font-size: 10vw;
  color: black;

  text-shadow: 5px 5px #fff;
  font-family: 'InkLipquid';

  @media all and (max-width: 1100px) {
    top: 0;
    border-radius: 0%;
    font-size: 80px;
  }
`;

const Title = styled.p``;

const BannerImg = styled.div`
  width: 50vw;
  height: calc(50vw * 0.76);
  min-width: 516px;
  min-height: 396px;
  padding: 2vw 1vw;
`;

const Img = styled.div`
  transition: all 0.2s ease-in-out;
  background-image: url('/images/home_img.png');

  background-size: 100% 100%;
  width: 100%;
  height: 100%;
`;

const BannerBtn = styled.div`
  opacity: 0;
  position: absolute;
  z-index: 4;
  width: 100%;
  height: 100%;
  @media all and (max-width: 1100px) {
    opacity: 1;
    display: block;
    height: auto;
    width: auto;
    bottom: 50px;
    font-size: 100px;
    color: tomato;
    font-family: 'InkLipquid';
    font-weight: 800;
  }
`;
