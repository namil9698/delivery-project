import React, { useEffect, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { logoutRequest } from '../redux/reducers/user';
import Slider from 'react-slick';

const Mydelivery = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(state => state.user);
  const [toggle, setToggle] = useState(false);
  const [height, setHieght] = useState({
    window: 0,
    client: 0,
    scroll: 0,
  });

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequest());
    router.push('/').then(() => window.scrollTo(0, 0));
  }, []);

  //Slider 세팅.
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const renderMyHistory = useCallback(() => {
    const myHistory = user.userData.history;
    return myHistory.map((item, index) => {
      const onlyfood = { ...item };
      delete onlyfood.totalPrice;
      renderStatistics(onlyfood);
      let onlyfoodList = [];
      for (let i in onlyfood) {
        onlyfoodList.push(
          <HistoryMyFood key={[i]}>
            <span>제품명:{onlyfood[i].name}</span>
            <span>가격:{onlyfood[i].price}원</span>
            <span>수량:{onlyfood[i].qty}개</span>
          </HistoryMyFood>
        );
      }
      return (
        <HistoryMyFoodList key={index}>
          {onlyfoodList}
          <p>총:{item.totalPrice}원</p>
        </HistoryMyFoodList>
      );
    });
  }, [user]);

  const renderStatistics = useCallback(() => {
    const myHistory = user.userData.history;
    let myStatistics = [];
    myHistory.map((item, index) => {
      const onlyfood = { ...item };
      delete onlyfood.totalPrice;
      for (let i in onlyfood) {
        const targetIndex = myStatistics.findIndex(item => item.name === onlyfood[i].name);
        if (targetIndex > -1) {
          myStatistics[targetIndex].qty = myStatistics[targetIndex].qty + onlyfood[i].qty;
        } else {
          myStatistics = [
            ...myStatistics,
            {
              name: onlyfood[i].name,
              qty: onlyfood[i].qty,
            },
          ];
        }
      }
    });

    let totalQty = 0;
    myStatistics.map(item => {
      return (totalQty += item.qty);
    });

    return (
      <StatisticsChartList>
        {myStatistics.map((item, index) => (
          <StatisticsChartItem
            key={index}
            index={index}
            qty={item.qty}
            totalType={myStatistics.length}
            totalQty={totalQty}
          >
            {item.name}
          </StatisticsChartItem>
        ))}
      </StatisticsChartList>
    );
  }, [user]);

  return (
    <WapperMydelivery>
      <Wrapper>
        <MydeliveryProfile>
          <Profile>
            <ProfileImg
              src={user.user.name ? '/images/login_google.png' : '/images/login_anonymous.png'}
            />
          </Profile>
          <LogoutBtn onClick={onClickLogout}>로그아웃</LogoutBtn>
        </MydeliveryProfile>
        <MydeliveryHistoryMyFood>
          <Slider {...settings}>{renderMyHistory()}</Slider>
        </MydeliveryHistoryMyFood>
      </Wrapper>

      <MydeliveryStatistics>
        <Statistics>{renderStatistics()}</Statistics>
      </MydeliveryStatistics>
    </WapperMydelivery>
  );
};

export default Mydelivery;

const WapperMydelivery = styled.div``;
const Wrapper = styled.div`
  display: flex;
`;

const MydeliveryProfile = styled.div``;
const Profile = styled.div`
  width: 400px;
  height: 400px;
`;
const ProfileImg = styled.div`
  background-image: url(${props => props.src});
  background-size: contain;
  width: 100%;
  height: 100%;
`;

const LogoutBtn = styled.div`
  width: 400px;
  height: 100px;
  background-color: blue;
`;

const MydeliveryHistoryMyFood = styled.div`
  width: 800px;
  height: 500px;
  background-color: transparent;
`;
const HistoryMyFoodList = styled.div`
  height: 500px;
  background-color: red;
`;
const HistoryMyFood = styled.div``;

const MydeliveryStatistics = styled.div``;
const Statistics = styled.div``;
const StatisticsChartList = styled.div`
  position: relative;

  width: 1200px;
  height: 500px;
  background-color: #fff;
  display: flex;
`;
const StatisticsChartItem = styled.div`
  width: calc(100% / ${props => props.totalType});
  height: calc(
    100% * (${props => props.qty} / (${props => props.totalQty} - ${props => props.totalType}))
  );
  align-self: flex-end;

  background-color: red;
`;
