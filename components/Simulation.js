import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import FoodData from './datas/food_data.json';
import { useSelector, useDispatch } from 'react-redux';
import { chageMyFoodList, deleteMyFood, addMyFood, subMyFood } from '../redux/reducers/simulation';
import { orderSaveRequest } from '../redux/reducers/user';

const Simulation = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.user);
  const user = useSelector(state => state.user.user);
  const { history } = useSelector(state => state.user.userData);
  const myFoodList = useSelector(state => state.simulation.myFoodList);

  //로그인 여부.
  useEffect(() => {}, [isLogin]);

  ///선택한 종류
  const [focusCategory, setFocusCategory] = useState(0);

  //음식 리스트 랜더 (선택한 종류의 음식 리스트를 랜더)
  const renderFoodList = () => {
    const [selectFoodList] = FoodData.filter(item => item.id === focusCategory);
    if (selectFoodList) {
      return selectFoodList.food.map(Food => (
        <FoodItem
          key={Food.id}
          active={myFoodList.find(myfood => myfood.id === Food.id)}
          onClick={() => createMyFoodList(Food)}
        >
          {Food.name}
        </FoodItem>
      ));
    } else {
    }
  };

  //선택 음식 리스트 저장 (자신이 선택한 음식들의 리스트들을 저장)
  const createMyFoodList = myFood => {
    let isThere = myFoodList.find(food => food.id === myFood.id);
    if (isThere) {
      dispatch(deleteMyFood(isThere));
    } else {
      dispatch(chageMyFoodList(myFood));
    }
  };

  //선택 음식 리스트에서 삭제
  const onDelete = useCallback(
    deleteFood => {
      dispatch(deleteMyFood(deleteFood));
    },
    [myFoodList]
  );

  //선택 음식의 수량 증가
  const onAdd = useCallback(
    changeFood => {
      dispatch(addMyFood(changeFood));
    },
    [myFoodList]
  );

  //선택 음식의 수량 감소
  const onSub = useCallback(
    changeFood => {
      if (changeFood.qty > 1) {
        dispatch(subMyFood(changeFood));
      }
    },
    [myFoodList]
  );

  //선택 음식 리스트 이미지 미리보기.
  const renderMyFoodImage = useCallback(() => {
    return myFoodList.map(food =>
      [...Array(food.qty)].map((item, index) => {
        return <MyFood key={index}>{food.name}</MyFood>;
      })
    );
  }, [myFoodList]);

  //총 주문가격.
  const getTotalPrice = useCallback(() => {
    let totalPrice = 0;
    myFoodList.map(food => {
      totalPrice += food.price * food.qty;
    });
    return totalPrice;
  }, [myFoodList]);

  //선택 음식 주문.(DB저장)
  const orderRequest = useCallback(
    (myFoodList, user) => {
      const totalPrice = getTotalPrice();
      dispatch(orderSaveRequest(myFoodList, user, totalPrice, history));
    },
    [myFoodList]
  );
  return (
    <SimulationWrapper>
      <Menu>
        <CategoryList>
          {FoodData.map(item => (
            <CategoryItem
              key={item.id}
              onClick={() => {
                setFocusCategory(item.id);
              }}
              active={item.id === focusCategory}
            >
              {item.category}
            </CategoryItem>
          ))}
        </CategoryList>
        <FoodList>{renderFoodList()}</FoodList>
      </Menu>
      <Order>
        <OrderList>
          {myFoodList.map((food, index) => (
            <OrderItem key={index}>
              <p>{food.name}</p>
              <span>x{food.qty}</span>
              <span>{food.price}원</span>
              <ControlBtn>
                <AddBtn onClick={() => onAdd(food)}>+</AddBtn>
                <SubBtn onClick={() => onSub(food)}>-</SubBtn>
                <DeleteBtn onClick={() => onDelete(food)}>삭제</DeleteBtn>
              </ControlBtn>
            </OrderItem>
          ))}
        </OrderList>
        <OrderTotalPrice>총{getTotalPrice()}원</OrderTotalPrice>
        <OrderRequest
          onClick={() => {
            if (isLogin) {
              orderRequest(myFoodList, user);
            } else {
              window.alert('로그인필요');
            }
          }}
        >
          주문
        </OrderRequest>
      </Order>
      <Preview>
        <PreviewMyFood>{renderMyFoodImage()}</PreviewMyFood>
      </Preview>
    </SimulationWrapper>
  );
};

export default Simulation;

const SimulationWrapper = styled.div``;

//Food
const Menu = styled.div``;
const CategoryList = styled.ul`
  display: flex;
  justify-content: space-around;
`;
const CategoryItem = styled.li`
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      color: red;
    `}
`;

const FoodList = styled.ul`
  display: flex;
  justify-content: space-around;
`;
const FoodItem = styled.li`
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      color: blue;
    `}
`;

//Order
const Order = styled.div``;
const OrderList = styled.div``;
const OrderItem = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const OrderTotalPrice = styled.div``;
const OrderRequest = styled.div``;

//button
const ControlBtn = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
`;
const DeleteBtn = styled.div`
  cursor: pointer;
`;
const AddBtn = styled.div`
  cursor: pointer;
`;
const SubBtn = styled.div`
  cursor: pointer;
`;

//Preview
const Preview = styled.div``;
const PreviewMyFood = styled.div`
  display: flex;
`;
const MyFood = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: yellow;
`;
