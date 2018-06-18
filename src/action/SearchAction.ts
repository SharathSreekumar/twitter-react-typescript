import {
    FETCH_SEARCH_ERROR,
    FETCH_SEARCH_DATA
} from './actionTypes';
import { 
    call, 
    put, 
    takeEvery 
} from 'redux-saga/effects';
import {
    searchApi
} from '../api/Search';

const fetchSearchError = (error: object) => {
    return {
        error,
        type: FETCH_SEARCH_ERROR,
    }
}

const fetchSearchSuccess = (data: object) => {
    return {
        data,
        type: FETCH_SEARCH_DATA,
        
    }
}

const formatData = (data:any) => {
    if ((!data) || (data && !data.result)) {
        throw {message: 'No data found', code: 'no_data_found'};
    }
    return data.result;
}

function* fetchSearchData(action:object) {
    try {
        const { params: { searchText, searchType } }:object = action;
        const data = yield call(searchApi, searchText, searchType);
        yield put(fetchSearchSuccess(formatData(data)));
    } catch (error) {
        // console.log("Search error", error[0]);
        yield put(fetchSearchError(error));
    }
}


function* watchFetchData() {
    yield takeEvery('FETCH_REQUESTED', fetchSearchData)
}

export default function* rootSaga() {
    yield [
        watchFetchData()
    ]
}