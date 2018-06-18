import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { searchReducer } from './searchReducer';

const appReducer = combineReducers({
    form: formReducer,
    searchReducer
});

const rootReducer = (state:any, action:object) => {
    return appReducer(state, action);
}

export default rootReducer;