// import axios from 'axios';
import * as request from 'request';
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

    const finalURL = urlParams(url, params);
    
    /* return request({
        method,
        url: finalURL,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const info = JSON.parse(body);
          console.log('asd', JSON.stringify(info));
        } else {
            console.log(JSON.stringify(error));
            console.log(JSON.stringify(response));
        }
    }); */

    return request({ method, url: finalURL });
}

export {
    getTwitterApiHeader,
    searchApi
}