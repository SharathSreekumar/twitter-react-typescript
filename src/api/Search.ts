import axios from 'axios';
import {
    capitalizeString,
    generateOAuthHeader,
    getApiUrl,
    // percentEncode,
    urlParams,
    // checkIfObjectIsNotEmpty,
} from '../utility/utility';

const getTwitterApiHeader = () => {
    return generateOAuthHeader('');
}

const searchApi = (search = '', headers: any = {}, searchType = 'twitter_search', method:string = 'GET') => {
    if(!search) {
        searchType = 'twitter_search';
    }
    let params = {};
    const { url, param_key } = getApiUrl(searchType);

    // url = 'https://api.twitter.com/1.1/statuses/update.json';

    // const fetch = window.fetch.bind(window);
    // param_key = ['status', 'include_entities'];
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

    /* method = 'POST';
    params = {
        'status': percentEncode('Hello Ladies + Gentlemen, a signed OAuth request!'),
        'include_entities': true
    }; */
    
    headers = generateOAuthHeader(url, method, params);
    
    const { authorization, param } = headers;
    console.log('headersAPI', authorization );
    params = { ...params, ...param };
    console.log('paramsAPI', params);
    const finalURL = urlParams(url, params);
    console.log(finalURL);
    
    const auth = authorization.replace(/\n/g, '');

    const apiHeaders = {
        authorization: auth,
        'Content-Type': 'application/json',
    }
    
    return axios({
        method,
        url: finalURL,
        headers: apiHeaders,
    }).then((response: any) => {
        console.log('response', response);
    }).catch((error: any) => {
        console.log('APIerror', error);
    });

    /* const tempHeaders = new Headers();
    tempHeaders.append('authorization', authorization.replace(/\n/g, '')); */


    /* return fetch(finalURL, { method, headers: tempHeaders }).then((response: any) => {
        console.log('response_data');
        return response.json()
            .then((body: any) => {
                if (body && body.RestResponse){
                    return body.RestResponse;
                } else {
                    return body;
                }
            });
    }).catch((error:any) => {
        // if(typeof error === 'object' && !checkIfObjectIsNotEmpty(error))
        //     return { message: 'API failed', code: 'api_failed' };
        // return Promise.reject(error);
        console.log('API_FAILED', error);
        return { message: 'API failed', code: 'api_failed' };
    }); */
}

export {
    getTwitterApiHeader,
    searchApi
}