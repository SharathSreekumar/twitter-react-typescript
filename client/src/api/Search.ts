// import axios from 'axios';
// import * as request from 'request';
import {
    capitalizeString,
    // generateOAuthHeader,
    getApiUrl,
    // percentEncode,
    urlParams,
    // checkIfObjectIsNotEmpty,
} from '../utility/utility';

// const getTwitterApiHeader = () => {
//     return generateOAuthHeader('');
// }

const searchApi = (search = '', headers: any = {}, searchType = 'twitter_search', method:string = 'GET') => {
    if(!search) {
        searchType = 'twitter_search';
    }
    const params = {};
    const { url, param_key } = getApiUrl(searchType);

    if(typeof param_key === 'string') {
        params[param_key] = capitalizeString(search);
    } else if(typeof param_key === 'object' && Array.isArray(param_key)) {
        param_key.forEach((key:any) => {
            if(key === 'result_type') {
                params[key] = 'recent'; // mixed / recent / popular
            } else {
                params[key] = search;
            }
        });
    }

    return fetch(urlParams(url, params), {})
    .then((response) => {
        return response.json()
        .then(body => {
            if (body && body.RestResponse) {
                return body.RestResponse;
            } else {
                return body;
            }
        });
    }).catch((error) => {
        console.error(JSON.stringify(error));
    });
}

export {
    // getTwitterApiHeader,
    searchApi
}