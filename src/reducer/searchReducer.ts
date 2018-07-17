import { combineReducers } from 'redux';
import {
    FETCH_HEADER_DATA,
    FETCH_HEADER_ERROR,
    FETCH_SEARCH_DATA,
    FETCH_SEARCH_ERROR,
} from '../action/actionTypes';

const headerSuccess = (state = {}, action: any) => {
    switch (action.type) {
        case FETCH_HEADER_DATA:
            return {
                ...state,
                data: action.data,
                error: {}
            }
        default: 
            return state;
    }
}

const headerFail = (state = {}, action:any) => {
    switch (action.type) {
        case FETCH_HEADER_ERROR:
        // throw new Error(action.error);
        return {
            ...state,
            error: action.error
        };
        default:
            return state;
    }
}

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
        case FETCH_HEADER_ERROR:
        return {
            ...state,
            error: action.error
        };
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
    headerFail,
    headerSuccess,
    searchFail,
    searchSuccess,
});