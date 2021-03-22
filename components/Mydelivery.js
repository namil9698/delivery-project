import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

const Mydelivery = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  return <WapperMydelivery></WapperMydelivery>;
};

export default Mydelivery;

const WapperMydelivery = styled.div``;
