import {
    capitalizeString,
    getApiUrl,
    urlParams,
    // checkIfObjectIsNotEmpty,
} from '../utility/utility';

const searchApi = (search = '', searchType = 'search') => {
    if(!search) {
        searchType = 'search';
    }
    const params = {};
    const { url, param_key } = getApiUrl(searchType);
    params[param_key] = capitalizeString(search);

    return fetch(urlParams(url, params), {})
        .then(response => {
            return response.json()
                .then(body => {
                    if (body && body.RestResponse){
                        return body.RestResponse;
                    } else {
                        return body;
                    }
                });
        }).catch(error => {
            /* if(typeof error === "object" && !checkIfObjectIsNotEmpty(error))
                return { message: 'API failed', code: 'api_failed' };
            return Promise.reject(error); */
            return { message: 'API failed', code: 'api_failed' };
        });
}

export {
    searchApi
}