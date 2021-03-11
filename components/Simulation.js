import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import FoodData from './datas/food_data.json';

const Simulation = () => {
  ///선택한 종류
  const [focusCategory, setFocusCategory] = useState(0);
  // 선택한 음식 리스트
  const [selectMyFood, setSelectMyFood] = useState([]);

  //음식 리스트 랜더 (선택한 종류의 음식 리스트를 랜더)
  const RenderFoodList = () => {
    const [myFoodList] = FoodData.filter(item => item.id === focusCategory);
    if (myFoodList) {
      return myFoodList.food.map(myFood => (
        <FoodItem
          active={selectMyFood.find(food => food === myFood)}
          onClick={() => onSelectFood(myFood)}
        >
          {myFood.name}
        </FoodItem>
      ));
    } else {
    }
  };

  //선택 음식 리스트 랜더 (자신이 선택한 음식들의 리스트들을 랜더)
  const onSelectFood = useCallback(
    myFood => {
      let isThere = selectMyFood.find(food => food === myFood);
      if (isThere) {
        setSelectMyFood(selectMyFood.filter(food => food !== isThere));
      } else {
        setSelectMyFood([...selectMyFood, myFood]);
        console.log(selectMyFood);
      }
    },
    [selectMyFood]
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
        <FoodList>{RenderFoodList()}</FoodList>
      </Menu>
      <Order>
        <OrderList>
          {selectMyFood.map(food => (
            <OrderItem>{food.name}</OrderItem>
          ))}
        </OrderList>
      </Order>
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
      color: red;
    `}
`;

//Order
const Order = styled.div``;
const OrderList = styled.div``;
const OrderItem = styled.div``;

//button
const DeleteBtn = styled.div``;
const ControlBtn = styled.div``;
const AddBtn = styled.div``;
const SubBtn = styled.div``;
