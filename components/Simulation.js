import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import FoodData from './datas/food_data.json';

const Simulation = () => {
  const [largeCategory, setLargeCategory] = useState(0);
  const [smallCategory, setSmallCategory] = useState(0);
  return (
    <SimulationWrapper>
      <FoodCategory>
        <FoodCategoryList>
          {FoodData.map((item, index) => (
            <FoodCategoryItem
              key={index + 1}
              onClick={() => {
                setLargeCategory(index + 1);
              }}
              active={index + 1 === largeCategory}
            >
              {item.largeCategory}
            </FoodCategoryItem>
          ))}
        </FoodCategoryList>
        <FoodCategoryList>
          <FoodCategoryItem>d</FoodCategoryItem>
        </FoodCategoryList>
      </FoodCategory>
      <Order>
        <OrderList></OrderList>
      </Order>
    </SimulationWrapper>
  );
};

export default Simulation;

const SimulationWrapper = styled.div``;
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

const Order = styled.div``;
const OrderList = styled.div``;
