import React, { useEffect, useState, useCallback } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { useRouter } from 'next/router';
import { logoutRequest } from '../redux/reducers/user';
import Slider from 'react-slick';

const Mydelivery = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(state => state.user);
  const { isLogin } = useSelector(state => state.user);

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
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //가장최근에 주문했던 기록순으로 랜더.
  const renderMyHistory = useCallback(() => {
    const myHistory = [...user.userData.history];
    return myHistory.reverse().map((item, index) => {
      const onlyfood = { ...item };
      delete onlyfood.totalPrice;
      delete onlyfood.orderDate;
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
          <p className="f_date">
            {item.orderDate.year}년 {item.orderDate.month}월 {item.orderDate.date}일
            {item.orderDate.hour}시 {item.orderDate.minute}분
          </p>
          {onlyfoodList}
          <p className="f_total_price">총:{item.totalPrice}원</p>
        </HistoryMyFoodList>
      );
    });
  }, [user]);

  //통계차트
  const renderStatistics = useCallback(() => {
    const myHistory = user.userData.history;
    let myStatistics = [];
    myHistory.map((item, index) => {
      const onlyfood = { ...item };
      delete onlyfood.totalPrice;
      delete onlyfood.orderDate;
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
    let maxQty = 0;
    myStatistics.map(item => {
      totalQty += item.qty;
      if (maxQty < item.qty) {
        maxQty = item.qty;
      }

      return totalQty, maxQty;
    });

    return (
      <ChartList>
        {myStatistics.map((item, index) => (
          <ChartItem
            key={index}
            index={index}
            name={item.name}
            qty={item.qty}
            totalType={myStatistics.length}
            totalQty={totalQty}
            maxQty={maxQty}
            active={item.qty === maxQty ? true : false}
          ></ChartItem>
        ))}
      </ChartList>
    );
  }, [user.userData.history]);

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
          <p>주문내역</p>
          {user.userData.history.length > 0 ? (
            <Slider {...settings}>{renderMyHistory()}</Slider>
          ) : (
            <span>주문내역이 없어요</span>
          )}
        </MydeliveryHistoryMyFood>
      </Wrapper>

      <MydeliveryChartList>{renderStatistics()}</MydeliveryChartList>
    </WapperMydelivery>
  );
};

export default Mydelivery;

const moveUp = keyframes`
 from {

 height:0;
 }

 to {
  
  height:100%;
 }


`;

const WapperMydelivery = styled.div``;
const Wrapper = styled.div`
  display: flex;

  @media all and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const MydeliveryProfile = styled.div``;
const Profile = styled.div`
  border: 1px solid #fff;
  border-bottom: none;
  width: 400px;
  height: 400px;

  background-color: tomato;

  @media all and (max-width: 1200px) {
    width: 100%;
    height: 320px;
  }
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

  @media all and (max-width: 1200px) {
    margin: 0 auto;
    width: 320px;
    height: 320px;
  }

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

    @media all and (max-width: 1200px) {
      font-size: 15px;
    }
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

  @media all and (max-width: 1200px) {
    width: 100%;
    height: 80px;
    font-size: 20px;
  }
`;

const MydeliveryHistoryMyFood = styled.div`
  border: 1px solid #fff;

  width: 800px;
  height: 500px;
  background-color: tomato;

  @media all and (max-width: 1200px) {
    width: 100%;
  }

  & > p {
    height: 50px;

    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media all and (max-width: 1200px) {
      font-size: 20px;
    }
  }

  & > span {
    display: block;
    width: 150px;
    margin: 100px auto;
    font-size: 20px;
    color: #fff;
  }
`;
const HistoryMyFoodList = styled.div`
  border: 1px solid #fff;

  height: 450px;
  background-color: #ffd300;

  display: flex !important;
  flex-direction: column;

  & > p {
    &.f_date {
      font-size: 20px;

      @media all and (max-width: 1200px) {
        font-size: 15px;
      }
    }

    &.f_total_price {
      margin-top: auto;
      color: #333;
      background-color: #c1c1c1;
    }

    height: 45px;

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

  height: 45px;

  & span {
    color: #777;
    margin-left: 5px;
  }
`;

const MydeliveryChartList = styled.div``;

const ChartList = styled.div`
  border: 1px solid #fff;

  position: relative;

  width: 1200px;
  height: 500px;
  background-color: tomato;
  background-image: url('/images/statistics.png');
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;

  @media all and (max-width: 1200px) {
    width: 100%;
    background-size: cover;
    background-position: -100px 20px;
  }

  &::after {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 30px;
    display: block;
    content: '나의 푸드차트';
    z-index: 3;

    @media all and (max-width: 1200px) {
      font-size: 20px;
    }
  }
`;
const ChartItem = styled.div`
  position: relative;

  width: calc(100% / ${props => props.totalType});
  max-width: 150px;

  z-index: 2;

  align-self: flex-end;

  transition: height 4s ease-in-out 1s;
  text-align: center;

  height: calc(80% * (${props => props.qty} / ${props => props.maxQty}));

  &::after {
    position: absolute;

    box-sizing: border-box;

    padding: 0 5px;
    padding-top: 10px;
    bottom: 0;

    display: block;

    content: '${props => props.name}  ${props => props.qty}회';
    line-break: strict;

    border: 1px solid #fff;
    background-color: #ffd300;

    font-size: 20px;

    width: 100%;

    z-index: -1;

    animation: ${moveUp} 3s linear;

    height: 100%;
    ${props =>
      props.active &&
      css`
        background-color: #00a1ff;
      `}

    @media all and (max-width: 1200px) {
      font-size: 12px;
    }
  }

  & span {
    display: inline-block;
    margin-top: 20px;
    font-size: 20px;
  }

  & p {
    height: 20px;

    display: block;
  }
`;
