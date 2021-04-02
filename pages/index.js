import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Link from 'next/link';

const index = () => {
  return (
    <HomeBanner>
      <Link href="/login">
        <Banner>
          <BannerTitle>
            <Title>My Delivery</Title>
          </BannerTitle>

          <BannerImg>
            <Img className="home_img" />
          </BannerImg>
          <BannerBtn>Click !</BannerBtn>
        </Banner>
      </Link>
    </HomeBanner>
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

const HomeBanner = styled.div`
  width: 100%;
  height: 100%;
`;

const Banner = styled.div`
  position: relative;
  animation: ${MoveUp} 1s linear;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  width: 800px;
  height: 800px;

  border-radius: 50%;
  background: rgba(241, 231, 103, 1);
  background: linear-gradient(to right, rgba(241, 231, 103, 1) 0%, rgba(254, 182, 69, 1) 100%);

  &:hover {
    cursor: pointer;
    & .home_img {
      background-image: url('/images/home_img_hover.png');
    }
  }

  @media all and (max-width: 1200px) {
    animation: none;
    flex-direction: column;
    border-radius: 0%;
    width: 100vw;
    height: 100vh;
  }
`;

const BannerTitle = styled.div`
  position: absolute;
  z-index: 3;

  font-size: 200px;
  color: black;

  text-shadow: 5px 5px #fff;
  font-family: 'InkLipquid';

  @media all and (max-width: 1200px) {
    position: static;
    border-radius: 0%;
    font-size: 50px;
  }
`;

const Title = styled.p``;

const BannerImg = styled.div`
  width: 800px;
  height: calc(800px * 0.76);

  @media all and (max-width: 1200px) {
    width: 320px;
    height: calc(320px * 0.76);
  }
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
  z-index: 4;

  @media all and (max-width: 1200px) {
    opacity: 1;
    display: block;
    font-size: 100px;
    color: tomato;
    font-family: 'InkLipquid';
    font-weight: 800;
  }
`;
