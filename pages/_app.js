import React from 'react';
import PropTypes from 'prop-types';
import wrapper from '../redux/store';

const App = ({ Component }) => {
  return (
    <>
      <Component />
    </>
  );
};

App.prototype = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
