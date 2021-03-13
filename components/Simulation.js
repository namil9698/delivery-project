import { array } from 'prop-types';
import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import FoodData from './datas/food_data.json';

const Simulation = () => {
  ///선택한 종류
  const [focusCategory, setFocusCategory] = useState(0);
  // 선택한 음식 리스트
  const [selectMyFood, setSelectMyFood] = useState([]);

  //음식 리스트 랜더 (선택한 종류의 음식 리스트를 랜더)
  const renderFoodList = () => {
    const [myFoodList] = FoodData.filter(item => item.id === focusCategory);
    if (myFoodList) {
      console.log(selectMyFood);
      return myFoodList.food.map(myFood => (
        <FoodItem
          key={myFood.id}
          active={selectMyFood.find(food => food.id === myFood.id)}
          onClick={() => createMyFoodList(myFood)}
        >
          {myFood.name}
        </FoodItem>
      ));
    } else {
    }
  };

  //선택 음식 리스트 저장 (자신이 선택한 음식들의 리스트들을 저장)
  const createMyFoodList = myFood => {
    let isThere = selectMyFood.find(food => food.id === myFood.id);
    if (isThere) {
      setSelectMyFood(selectMyFood.filter(food => food.id !== isThere.id));
    } else {
      setSelectMyFood([...selectMyFood, { ...myFood, qty: 1 }]);
    }
  };

  //선택 음식 리스트에서 삭제
  const onDelete = deleteFood => {
    setSelectMyFood(selectMyFood.filter(food => food !== deleteFood));
  };

  //선택 음식의 수량 증가
  const onAdd = ChangeFood => {
    let changeQty = ChangeFood.qty + 1;
    setSelectMyFood(
      selectMyFood.map(food => (food.id === ChangeFood.id ? { ...food, qty: changeQty } : food))
    );
  };

  //선택 음식의 수량 감소
  const onSub = ChangeFood => {
    if (ChangeFood.qty > 1) {
      let changeQty = ChangeFood.qty - 1;
      setSelectMyFood(
        selectMyFood.map(food => (food.id === ChangeFood.id ? { ...food, qty: changeQty } : food))
      );
    }
  };

  //선택 음식 리스트 이미지 미리보기.
  const renderMyFoodImage = () => {
    return selectMyFood.map(food =>
      [...Array(food.qty)].map(() => {
        return <MyFood>{food.name}</MyFood>;
      })
    );
  };

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
          {selectMyFood.map(food => (
            <OrderItem>
              <p>{food.name}</p>
              <span>x{food.qty}</span>
              <ControlBtn>
                <AddBtn onClick={() => onAdd(food)}>+</AddBtn>
                <SubBtn onClick={() => onSub(food)}>-</SubBtn>
                <DeleteBtn onClick={() => onDelete(food)}>삭제</DeleteBtn>
              </ControlBtn>
            </OrderItem>
          ))}
        </OrderList>
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
