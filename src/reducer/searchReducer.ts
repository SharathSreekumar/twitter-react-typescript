import { combineReducers } from 'redux';
import {
    FETCH_SEARCH_DATA,
    FETCH_SEARCH_ERROR,
} from '../action/actionTypes';


const searchSuccess = (state = {}, action:any) => {
    switch (action.type) {
        case FETCH_SEARCH_DATA:
            return {
                ...state,
                data: action.data,
                error: {},
            };
        default:
            return state;
    }
}

const searchFail = (state = {}, action:any) => {
    switch (action.type) {
        case FETCH_SEARCH_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}

export const searchReducer = combineReducers({
    searchFail,
    searchSuccess,
});