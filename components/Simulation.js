import React, { useState } from 'react';
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
        <FoodItem active={false} onClick={() => onSelectFood(myFood)}>
          {myFood.name}
        </FoodItem>
      ));
    } else {
    }
  };

  //선택한 음식 저장.
  const onSelectFood = myFood => {
    setSelectMyFood([...selectMyFood, myFood]);

    return console.log(selectMyFood);
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
        <FoodList>{RenderFoodList()}</FoodList>
      </Menu>
      <Order>
        <OrderList></OrderList>
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
const OrderList = styled.div`
  display: flex;
`;
const OrderItem = styled.div``;
