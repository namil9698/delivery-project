import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDataRequest } from '../redux/reducers/user';

const Mydelivery = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [toggle, setToggle] = useState(false);
  const [height, setHieght] = useState({
    window: 0,
    client: 0,
    scroll: 0,
  });

  useEffect(() => {
    function onScroll() {
      setHieght({
        window: window.scrollY,
        client: document.documentElement.clientHeight,
        scroll: document.documentElement.scrollHeight,
      });
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const renderMyHistory = () => {
    const myHistory = user.userData.history;
    return myHistory.map((item, index) => {
      const onlyfood = { ...item };
      delete onlyfood.totalPrice;
      let onlyfoodList = [];
      for (let i in onlyfood) {
        onlyfoodList.push(
          <div key={[i]}>
            <span>제품명:{onlyfood[i].name}</span>
            <span>가격:{onlyfood[i].price}원</span>
            <span>수량:{onlyfood[i].qty}개</span>
          </div>
        );
      }
      return (
        <div key={index}>
          {onlyfoodList}
          <p>총:{item.totalPrice}원</p>
        </div>
      );
    });
  };

  return (
    <WapperMydelivery>
      <div
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        내 주문내역들 보기
      </div>
      {toggle ? renderMyHistory() : ''}
    </WapperMydelivery>
  );
};

export default Mydelivery;

const WapperMydelivery = styled.div``;
