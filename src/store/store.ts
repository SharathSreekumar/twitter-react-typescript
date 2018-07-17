import * as Raven from 'raven-js';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../action/SearchAction';
import rootReducer from '../reducer/index';

Raven
  .config(`https://${process.env.REACT_APP_SENTRY_TRACKER_KEY}@sentry.io/1243344`)
  .install();

const sagaMiddleware = createSagaMiddleware({
    onError: (error) => {
        console.log('SagaError', error);
        Raven.captureException(error);
    }
});
const middlewares = [logger, sagaMiddleware];

const configureStore = (initialState = {}) => {
    const store = createStore(
        rootReducer,
        { ...initialState },
        applyMiddleware( ...middlewares )
    );

    sagaMiddleware.run(rootSaga);
    return store;
}

export default configureStore;