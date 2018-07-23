import { 
    call, put, takeEvery 
} from 'redux-saga/effects';
import {
    getTwitterApiHeader,
    searchApi
} from '../api/Search';
import {
    FETCH_HEADER_DATA,
    FETCH_HEADER_ERROR,
    FETCH_SEARCH_DATA,
    FETCH_SEARCH_ERROR,
} from './actionTypes';

const fetchHeaderError = (error: object) => {
    return {
        error,
        type: FETCH_HEADER_ERROR,
    }
}

const fetchHeaderSuccess = (data: object) => {
    return {
        data,
        type: FETCH_HEADER_DATA,
        
    }
}

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

/* const formatData = (data:any) => {
    if ((!data) || (data && !data.result)) {
        throw {message: 'No data found', code: 'no_data_found'};
    }
    return data.result;
} */

function* fetchHeaderData(action:object) {
    try {
        const data = yield call(getTwitterApiHeader);
        yield put(fetchHeaderSuccess(data));
    } catch (error) {
        yield put(fetchHeaderError(error));
    }
}


function* watchFetchHeaderData() {
    yield takeEvery('FETCH_API_HEADER', fetchHeaderData)
}

function* fetchSearchData(action:object) {
    try {
        const { params: { searchText } }: any = action;
        const data = yield call(searchApi, searchText);
        yield put(fetchSearchSuccess(data));
    } catch (error) {
        yield put(fetchSearchError(error));
    }
}


function* watchFetchData() {
    yield takeEvery('FETCH_REQUESTED', fetchSearchData)
}

export default function* rootSaga() {
    yield [
        watchFetchData(),
        watchFetchHeaderData()
    ]
}