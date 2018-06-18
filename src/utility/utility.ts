import {
    COUNTRY_ISO2_API_URL,
    COUNTRY_ISO3_API_URL,
    COUNTRY_LIST_SEARCH_API_URL,
    ISO2_KEY,
    ISO3_KEY,
    LIST_SEARCH_KEY,
} from '../Constant';

/**
 * @param {string} text 
 * This function CAPITALIZES the string/text
 */
const capitalizeString = (text:string) => {
    return text.toUpperCase();
}

/**
 * This function returns respective API URL & Param_Key to be replaced
 */

 const getApiUrl = (searchType='search') => {
    switch(searchType) {
        case 'iso2_search':
            return {url: COUNTRY_ISO2_API_URL, param_key: ISO2_KEY};
        case 'iso3_search':
            return {url: COUNTRY_ISO3_API_URL, param_key: ISO3_KEY};
        default:
            return {url: COUNTRY_LIST_SEARCH_API_URL, param_key: LIST_SEARCH_KEY};
    }
 }

/**
 * @param {string} url 
 * @param {Object} params 
 * This function adds Param values to the URL 
 */
const urlParams = (url:string, params={}) => {
    let urlChanges = url;
    Object.keys(params).forEach(key => { urlChanges = urlChanges.replace(key, params[key]) });
    return urlChanges;
}

/**
 * This function calculate the Data Length count
 */
const dataContentCount = (data:object = []) => {
    if(data && typeof data === "object") {
        return (Array.isArray(data) ? data.length : 1);
    }
    return 0;
}

/**
 * 
 * @param {*} data 
 * This function checks if the JSON object is empty or not
 */
const checkIfObjectIsNotEmpty = (data = {}) => {
    if(data && typeof data === "object" && data.constructor.name === "Object"){
        return Object.keys(data).length > 0;
    }
    return false;
}

const getValueFromUrlQueryParam = (url:string = '', paramKeys:any = []) => {
    const queryParamValues = {};

    if(url && url.length > 0) {
        const urlSplit = url.split('?');
        if(urlSplit.length > 1) {
            url = urlSplit[1];
            
            paramKeys.forEach((keys:any) => {
                if(url.indexOf(keys) >= 0) {
                    queryParamValues[keys] = url.split(`${keys}=`)[1].split('&')[0];
                }
            });
        }
    }

    return queryParamValues;
}

const generateQueryParamUrlFromObject = (paramObject = {}) => {
    let searchQuerySlug = '?';
    Object.keys(paramObject).forEach(value => {
        searchQuerySlug += value + '=' + paramObject[value];
    });

    return searchQuerySlug;
}

export {
    capitalizeString,
    checkIfObjectIsNotEmpty,
    dataContentCount,
    generateQueryParamUrlFromObject,
    getApiUrl,
    getValueFromUrlQueryParam,
    urlParams,
}