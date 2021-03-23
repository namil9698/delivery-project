import React from 'react';
import styled, { css } from 'styled-components';

const Popup = () => {
  return (
    <PopupWrapper>
      <PopupShadow />
      <PopupBlock>로딩중...</PopupBlock>
    </PopupWrapper>
  );
};

export default Popup;

const PopupWrapper = styled.div`
  position: absolute;
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

const PopupBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 100px;
  text-align: center;
`;
