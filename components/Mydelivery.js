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
            <span className="f_name">{onlyfood[i].name}</span>
            <span className="f_price">{onlyfood[i].price}원</span>
            <span className="f_qty">{onlyfood[i].qty}개</span>
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

  console.log(new Date());
  return (
    <WapperMydelivery>
      <Wrapper>
        <MydeliveryProfile>
          <Profile>
            <ProfileImg
              src={user.user.name ? '/images/login_google.png' : '/images/login_anonymous.png'}
              name={user.user.name ? user.user.name : '비회원'}
              email={user.user.name ? user.user.email : ''}
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
  border: 1px solid #fff;
  border-bottom: none;
  width: 400px;
  height: 400px;

  background-color: tomato;
`;
const ProfileImg = styled.div`
  position: relative;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: -45px center;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-color: #ffd300;
  width: 100%;
  height: 100%;

  &::after {
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%);

    text-align: center;
    content: '${props => props.name}님 ${props => props.email}';

    font-size: 20px;
    color: #000;
    display: inline-block;
    height: 40px;
  }
`;

const LogoutBtn = styled.div`
  border: 1px solid #fff;
  width: 400px;
  height: 100px;

  transition: all 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 30px;
  color: #fff;
  cursor: pointer;

  background-color: #00a1ff;

  &:hover {
    font-size: 40px;
  }
`;

const MydeliveryHistoryMyFood = styled.div`
  width: 800px;
  height: 500px;
  background-color: transparent;
`;
const HistoryMyFoodList = styled.div`
  border: 1px solid #fff;

  height: 500px;
  background-color: #ffd300;

  display: flex !important;
  flex-direction: column;

  & > p {
    margin-top: auto;

    height: 60px;
    background-color: #d00005;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const HistoryMyFood = styled.div`
  background-color: #fff;

  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 55px;

  & span {
    color: #777;
    margin-left: 5px;
  }
`;

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
