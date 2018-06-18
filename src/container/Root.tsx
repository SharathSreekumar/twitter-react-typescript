import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../component/App';

const Root = ({ store }) => (
    <Provider store={store}>
      {/* <App /> */}
      <Router>
      <Route path={`/`} component={App} />
      </Router>
    </Provider>
  );
  
  Root.propTypes = {
    store: PropTypes.object.isRequired
  };
  
  export default Root;