import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import FoodData from './datas/food_data.json';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { chageMyFoodList, deleteMyFood, addMyFood, subMyFood } from '../redux/reducers/simulation';
import { orderSaveRequest, RequsetOrderPopupClose } from '../redux/reducers/user';

const Simulation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLogin } = useSelector(state => state.user);
  const user = useSelector(state => state.user.user);
  const isPopup = useSelector(state => state.user.popup);
  const { history } = useSelector(state => state.user.userData);
  const myFoodList = useSelector(state => state.simulation.myFoodList);

  //로그인 여부.
  useEffect(() => {
    if (!isLogin) {
      router.push('/login').then(() => window.scrollTo(0, 0));
    }
  }, [isLogin]);

  ///선택한 종류
  const [focusCategory, setFocusCategory] = useState(0);

  //음식 리스트 랜더 (선택한 종류의 음식 리스트를 랜더)
  const renderFoodList = () => {
    const [selectFoodList] = FoodData.filter(item => item.id === focusCategory);
    if (selectFoodList) {
      return selectFoodList.food.map(food => (
        <FoodItem
          key={food.id}
          active={myFoodList.find(myfood => myfood.id === food.id)}
          onClick={() => createMyFoodList(food)}
        >
          {food.name}
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
    } else if (myFoodList.length > 7) {
      alert('최대 8종류의 메뉴만 선택할 수 있어요.');
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
      if (myFoodList.find(item => item.qty > 14)) {
        alert('최대 수량입니다.');
      } else {
        dispatch(addMyFood(changeFood));
      }
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
    const location1 = [[0, 0.25, 1]];
    const location2 = [
      [0.25, 0.25, 1],
      [-0.25, 0.25, 1],
    ];
    const location4 = [
      [0, 0, 3],
      [0.5, 0.5, 2],
      [0, 0.75, 1],
      [-0.5, 0.5, 2],
    ];
    const location6 = [
      [-0.25, 0, 3],
      [0.25, 0, 3],
      [0.5, 0.5, 2],
      [0.2, 0.75, 1],
      [-0.2, 0.75, 1],
      [-0.5, 0.5, 2],
    ];
    const location8 = [
      [0, 0, 5],
      [0.25, 0.25, 4],
      [0.5, 0.5, 3],
      [0.25, 0.75, 2],
      [0, 0.8, 1],
      [-0.25, 0.75, 2],
      [-0.5, 0.5, 3],
      [-0.25, 0.25, 4],
    ];
    let location = [];
    if (myFoodList.length > 6) {
      location = location8;
    } else if (myFoodList.length > 4) {
      location = location6;
    } else if (myFoodList.length > 2) {
      location = location4;
    } else if (myFoodList.length > 1) {
      location = location2;
    } else {
      location = location1;
    }
    return myFoodList.map((food, index) => {
      return [...Array(food.qty)].map((item, key) => {
        return <MyFood key={key} src={food.imgUrl} location={location[index]} row={key} />;
      });
    });
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
      const date = new Date();
      const orderDate = {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
      };
      if (myFoodList.length > 0) {
        const totalPrice = getTotalPrice();
        dispatch(orderSaveRequest(myFoodList, user, totalPrice, history, orderDate));
      } else {
        alert('장바구니가 비어있습니다.');
      }
    },
    [myFoodList]
  );

  //수량에 따른 이미지 변화.
  const changePreviewImg = useCallback(() => {
    if (myFoodList.find(item => item.qty > 10)) {
      return '/images/preview3.png';
    } else if (myFoodList.find(item => item.qty > 5)) {
      return '/images/preview2.png';
    } else {
      return '/images/preview1.png';
    }
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
              src={item.iconUrl}
            >
              {item.category}
            </CategoryItem>
          ))}
        </CategoryList>
      </Menu>
      <SimulationContents>
        <Order>
          <OrderList>
            <OrderListHeader>장바구니</OrderListHeader>
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
          <OrderTotal>
            <OrderTotalPrice>
              <span>총가격:</span>
              <span>{getTotalPrice()}원</span>
            </OrderTotalPrice>
            <OrderTotalRequest
              onClick={() => {
                if (isLogin) {
                  orderRequest(myFoodList, user);
                } else {
                  window.alert('로그인필요');
                  router.push('/login').then(() => window.scrollTo(0, 0));
                }
              }}
            >
              <span>주문</span>
            </OrderTotalRequest>
          </OrderTotal>
        </Order>
        <Wrapper className="food_preview">
          <FoodList>{renderFoodList()}</FoodList>
          <Preview src={changePreviewImg}>
            <PreviewMyFood>{renderMyFoodImage()}</PreviewMyFood>
          </Preview>
        </Wrapper>
      </SimulationContents>
      {isPopup ? (
        <SimulationPopup>
          <Popup>
            <PopupImg src="/images/success.png" />
            <PopupBtn
              onClick={() => {
                dispatch(RequsetOrderPopupClose());
                router.push('/mydelivery').then(() => window.scrollTo(0, 0));
              }}
            >
              확인
            </PopupBtn>
          </Popup>
        </SimulationPopup>
      ) : (
        ''
      )}
    </SimulationWrapper>
  );
};

export default Simulation;

const SimulationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
`;

const SimulationContents = styled.div`
  display: flex;

  @media all and (max-width: 1200px) {
    flex-direction: column;
  }
`;

//Food
const Menu = styled.div``;
const CategoryList = styled.ul`
  margin: 0 auto;
  padding: 0 100px;
  height: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;

  @media all and (max-width: 1200px) {
    height: 50px;
    font-size: 12px;
    padding: 0;
  }
`;
const CategoryItem = styled.li`
  position: relative;
  width: 25%;
  height: 100%;

  display: block;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #323232;
  font-size: 30px;
  font-weight: 800;

  @media all and (max-width: 1200px) {
    font-size: 20px;
  }

  & ::before {
    content: '';
    display: block;
    background-image: url(${props => props.src});
    background-size: 100% 100%;
    width: 50px;
    height: 50px;

    @media all and (max-width: 1200px) {
      display: none;
    }
  }

  & ::after {
    display: block;
    position: absolute;
    bottom: 0;

    content: '';

    height: 10px;
    width: 3px;
    background-color: #d00005;

    transform: scaleY(0);
    transition: transform 0.2s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s,
      //스케일 후 넓이 애니메이션
      background-color 0.1s;

    @media all and (max-width: 1200px) {
      height: 5px;
      transition: none;
    }
  }

  &:hover {
    &::after {
      transform: scaleY(1);
      width: 100%;
    }
  }

  ${props =>
    props.active &&
    css`
      color: #d00005;
      & ::after {
        transform: scaleY(1);
        width: 100%;
      }
    `};
`;

const FoodList = styled.ul`
  display: flex;
  justify-content: space-between;
  height: 100px;
  background-color: #ffd300;
  border: 1px solid #fff;
  box-sizing: border-box;

  @media all and (max-width: 1200px) {
    height: 50px;
  }
`;
const FoodItem = styled.li`
  flex: 1;
  display: block;
  cursor: pointer;
  height: 100%;
  background-color: #ffd300;
  color: #fff;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 25px;
  &::after {
    display: block;
    position: absolute;
    z-index: 10;
    content: '';
    width: 20px;
    height: 20px;
    transition: all 0.1s ease;
  }

  @media all and (max-width: 1200px) {
    font-size: 15px;
  }

  ${props =>
    props.active &&
    css`
      &::after {
        display: block;
        content: '';
        background-image: url('/images/check.svg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        z-index: 3;
        width: 50px;
        height: 50px;
      }
    `}
`;

//Order
const Order = styled.div`
  border: 1px solid #fff;
  width: 30%;
  height: 900px;
  background-color: #00a1ff;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  @media all and (max-width: 1200px) {
    border: none;
    order: 2;
    height: 570px;
    width: 100%;
  }
`;

const OrderList = styled.div``;
const OrderListHeader = styled.div`
  height: 100px;
  font-size: 50px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  @media all and (max-width: 1200px) {
    height: 60px;
    font-size: 30px;
  }
`;

const OrderItem = styled.div`
  height: 75px;
  padding: 0 40px;
  display: flex;
  align-items: center;

  transition: all 0.1s ease;

  background-color: #fff;
  border: 1px solid #ccc;
  color: #777;

  &:hover {
    transform: scale(1.1);
  }

  & p {
    font-size: 20px;
    font-weight: bold;
  }

  & span {
    margin-left: 10px;
  }

  @media all and (max-width: 1200px) {
    height: 50px;
    padding: 0 20px;

    & p {
      font-size: 15px;
    }

    & span {
      margin-left: 5px;
    }

    &:hover {
      transform: none;
    }
  }
`;
const OrderTotal = styled.div`
  margin-top: auto;
  text-align: center;
`;
const OrderTotalPrice = styled.div`
  height: 80px;
  background-color: #ffd300;

  display: flex;
  justify-content: center;
  align-items: center;

  @media all and (max-width: 1200px) {
    height: 40px;
  }
`;
const OrderTotalRequest = styled.div`
  font-size: 40px;
  background-color: #d00005;
  height: 118px;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  @media all and (max-width: 1200px) {
    font-size: 35px;
    height: 70px;
  }
  & span {
    transition: all 0.1s ease;
  }

  &:hover {
    & span {
      transform: scale(1.3);
    }
  }
`;

//button
const ControlBtn = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
  margin-left: auto;
`;
const DeleteBtn = styled.div`
  color: #d00005;
  cursor: pointer;
`;
const AddBtn = styled.div`
  color: #00a1ff;
  cursor: pointer;
`;
const SubBtn = styled.div`
  color: #ffd300;
  cursor: pointer;
`;

//Preview
const Preview = styled.div`
  overflow: hidden;
  width: 840px;
  height: 800px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${props => props.src});
  background-position: 10px 50px;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: tomato;

  transition: all 0.5s ease;

  @media all and (max-width: 1200px) {
    width: 320px;
    height: 300px;
    margin: 0 auto;
    background-size: 320px 300px;
    background-position: -10px 20px;
  }
`;
const PreviewMyFood = styled.div`
  position: relative;
  width: 100%;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const MyFood = styled.div`
  position: absolute;

  transition: all 0.5s ease;

  left: calc(${props => props.location[0]}*60% + 300px);
  bottom: calc(${props => props.location[1]} * 200px + (${props => props.row}* 10px));

  width: calc(250px - ${props => props.location[1]} * 100px);
  height: calc(200px - ${props => props.location[1]} * 100px);
  filter: brightness(calc(100% - ${props => props.location[1]}* 30%));
  z-index: ${props => props.location[2]};

  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  @media all and (max-width: 1200px) {
    width: calc(120px - ${props => props.location[1]} * 100px);
    height: calc(120px - ${props => props.location[1]} * 100px);
    left: calc(${props => props.location[0]}*60% + 100px);
    bottom: calc(${props => props.location[1]} * 120px + (${props => props.row}* 10px));
  }
`;

//Wrapper
const Wrapper = styled.div`
  &.food_preview {
    width: 70%;

    @media all and (max-width: 1200px) {
      order: 1;
      width: 100%;
      background-color: tomato;
    }
  }
`;

//popup

const SimulationPopup = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  z-index: 333;

  backdrop-filter: blur(10px);
`;
const Popup = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.3);
  top: 10%;
  width: 500px;
  height: 500px;
`;

const PopupImg = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center top;

  background-color: #fff;

  width: 100%;
  height: 100%;

  &::after {
    display: block;
    margin-top: 50px;
    text-align: center;
    content: '주문이 완료되었습니다!';
    color: #d00005;
    font-size: 40px;
  }
`;
const PopupBtn = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #00a1ff;
  height: 100px;
  font-size: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
`;
