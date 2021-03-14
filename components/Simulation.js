import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import FoodData from './datas/food_data.json';
import { useSelector, useDispatch } from 'react-redux';
import { chageMyFoodList, deleteMyFood, addMyFood, subMyFood } from '../redux/reducers/simulation';

const Simulation = () => {
  const dispatch = useDispatch();

  const myFoodList = useSelector(state => state.simulation.myFoodList);
  console.log(myFoodList);

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
      [...Array(food.qty)].map(() => {
        return <MyFood>{food.name}</MyFood>;
      })
    );
  }, [myFoodList]);

  const getTotalPrice = useCallback(() => {
    let totlaPirce = 0;
    myFoodList.map(food => {
      totlaPirce += food.price * food.qty;
    });
    return totlaPirce;
  }, [myFoodList]);

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
          {myFoodList.map(food => (
            <OrderItem>
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
