import React from 'react';
import styled, { css } from 'styled-components';

const Popup = () => {
  return (
    <PopupWrapper>
      <PopupShadow />
      <PopupImg src="/images/loading.svg" />
    </PopupWrapper>
  );
};

export default Popup;

const PopupWrapper = styled.div`
  position: absolute;

  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const PopupShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const PopupImg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${props => props.src});

  background-size: 100% 100%;
  width: 50%;
  height: 50%;
  text-align: center;
`;
