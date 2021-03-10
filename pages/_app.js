import React from 'react';
import PropTypes from 'prop-types';

const App = ({ Component }) => {
  return <Component />;
};

App.prototype = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
