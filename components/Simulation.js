import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import FoodData from './datas/food_data.json';

const Simulation = () => {
  const [largeCategory, setLargeCategory] = useState(0);
  const [smallCategory, setSmallCategory] = useState(0);

  const RenderFoodList = () => {
    let [myFoodList] = FoodData.filter(item => item.id === largeCategory);
    return myFoodList.smallCategory.map(myFood => (
      <FoodCategoryItem>{myFood.name}</FoodCategoryItem>
    ));
  };

  return (
    <SimulationWrapper>
      <FoodCategory>
        <FoodCategoryList>
          {FoodData.map(item => (
            <FoodCategoryItem
              key={item.id}
              onClick={() => {
                setLargeCategory(item.id);
              }}
              active={item.id === largeCategory}
            >
              {item.largeCategory}
            </FoodCategoryItem>
          ))}
        </FoodCategoryList>
        <FoodCategoryList>{RenderFoodList()}</FoodCategoryList>
      </FoodCategory>
      <Order>
        <OrderList></OrderList>
      </Order>
    </SimulationWrapper>
  );
};

export default Simulation;

const SimulationWrapper = styled.div``;

//Food
const FoodCategory = styled.div``;
const FoodCategoryList = styled.ul`
  display: flex;
  justify-content: space-around;
`;
const FoodCategoryItem = styled.li`
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
