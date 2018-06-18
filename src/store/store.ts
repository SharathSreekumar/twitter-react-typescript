import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '../reducer/index';
import rootSaga from '../action/SearchAction';


const sagaMiddleware = createSagaMiddleware();
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