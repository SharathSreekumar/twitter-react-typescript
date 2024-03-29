// import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../component/App';

const Root = ({ store }:{store: any}) => (
    <Provider store={store}>
        <Router>
            <Route path={`/`} component={App} />
        </Router>
    </Provider>
);
  
/* Root.propTypes = {
    store: PropTypes.object.isRequired
}; */
  
export default Root;