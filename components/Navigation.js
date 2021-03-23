import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

const Navigation = () => {
  return (
    <NavigationWrapper>
      <div>
        <Link href="/login">로그인</Link>
      </div>
      <div>
        <Link href="/simulation">시뮬레이션</Link>
      </div>
      <div>
        <Link href="/mydelivery">마이딜리버리</Link>
      </div>
    </NavigationWrapper>
  );
};

const NavigationWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  font-size: 30px;
`;

export default Navigation;
