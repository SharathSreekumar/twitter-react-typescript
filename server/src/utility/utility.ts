import {
    TWITTER_SEARCH_API_URL,
    TWITTER_SEARCH_QUERY_KEY,
    TWITTER_SEARCH_RESULT_TYPE_KEY,
} from '../Constant';

import * as CryptoJS from 'crypto-js';
import * as OAuth from 'oauth';

/**
 * @param {string} text 
 * This function CAPITALIZES the string/text
 */
const capitalizeString = (text:string) => {
    return text.toUpperCase();
}

const getCurrentTimeStamp = () => {
    const date = new Date();
    return Math.floor(date.getTime() / 1000);
}

/**
 * 
 * @param unOrderedData 
 */
const sortObject = (unOrderedData: object) => {
    const orderedData = {};

    Object.keys(unOrderedData).sort().forEach((key) => {
        orderedData[key] = unOrderedData[key];
    });

    return orderedData;
}

/**
 * This function will generate a Random String beteen A-Z, a-z & 0-9
 * @param length 
 */
const randomString = (length:number=6):string => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const generateSignatureBaseString = (method: string = 'POST', url: string, oAuthKeys: object = {}) => {
    oAuthKeys = sortObject(oAuthKeys);

    let baseString = method + '&' + percentEncode(url);

    baseString = baseString + '&' + percentEncode(paramSerialize(oAuthKeys, false));

    return baseString;
}

/**
 * This function is to generate Twitter oAuthSigningKey
 * @param consumer_secret 
 * @param token_secret 
 */
const oAuthSigningKey = (consumerSecret:string = '', tokenSecret:string = '') => {
    return consumerSecret + '&' + tokenSecret;
};

/**
 * 
 * @param baseString 
 * @param signingKey 
 */
const hmacSha1 = (baseString: string, signingKey: string) => {
    const hmac = CryptoJS.HmacSHA1(baseString, signingKey);
    return hmac.toString(CryptoJS.enc.Base64) || '';
};

/**
 * 
 * @param stringData 
 */
function percentEncode(stringData: string) {
    return encodeURIComponent(stringData).replace(/[!*()']/g, (character) => {
      return '%' + character.charCodeAt(0).toString(16);
    });
  };

/**
 * 
 * @param baseString 
 * @param signingKey 
 */
const oAuthSignatureGenerator = (baseString: string, signingKey: string) => {
    const signature = hmacSha1(baseString, signingKey);
    return signature;
};

/**
 * This function is to request for OAuth Signature
 * @param consumerKey 
 * @param appSecret 
 * @param tokenKey 
 * @param tokenSecret 
 */
const requestOAuthAccessToken = (consumerKey:string, appSecret:string, accessTokenKey:string, accessTokenSecret:string):any => {
    const { OAuth2 } = OAuth;

    const oauth2 = new OAuth2(consumerKey,
        appSecret, 
        'https://api.twitter.com/', 
        null,
        'oauth2/token', 
        null
    );
    
    return new Promise((resolve, reject) => {
        try {
            oauth2.getOAuthAccessToken( '',
                {'grant_type':'client_credentials'},
                (e, accessToken, refreshToken, results) => {
                    resolve(accessToken);
            });
        } catch (error) {
            reject(error);
        }
    });
}

const generateOAuthHeader = (url: string, method: string = 'GET', params: object = {}):any => {
    const { 
        REACT_APP_TWITTER_API_ACCESS_TOKEN, 
        REACT_APP_TWITTER_API_ACCESS_TOKEN_SECRET,
        REACT_APP_TWITTER_API_KEY, 
        REACT_APP_TWITTER_API_SECRET, 
    } = process.env;
    

    const currentTimeStamp = getCurrentTimeStamp();
    const btoa = require('btoa');
    const nonceGenerate = btoa(REACT_APP_TWITTER_API_KEY + ':' + currentTimeStamp);
    
    const tempData = {
        oauth_consumer_key: REACT_APP_TWITTER_API_KEY,
        oauth_token: REACT_APP_TWITTER_API_ACCESS_TOKEN,
        oauth_timestamp: currentTimeStamp,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_nonce: nonceGenerate,
        oauth_version:'1.0', 
    }

    const baseString = generateSignatureBaseString(method, url, {...tempData, ...params});

    const signature = oAuthSignatureGenerator(
        baseString, 
        oAuthSigningKey(REACT_APP_TWITTER_API_SECRET, REACT_APP_TWITTER_API_ACCESS_TOKEN_SECRET)
    );

    const data = {
        ...tempData,
        'oauth_signature': percentEncode(signature)
    }
    
    return {
        authorization: `OAuth oauth_consumer_key="${data.oauth_consumer_key}",oauth_token=${data.oauth_token},oauth_signature_method=${data.oauth_signature_method},oauth_timestamp="${data.oauth_timestamp}",oauth_nonce=${data.oauth_nonce},oauth_version="${data.oauth_version}",oauth_signature=${data.oauth_signature}`,
        param: data 
    };
}

/**
 * This function converts the key-value object to key=value URL search Param string
 */
const paramSerialize = (params: any = {}, questionMark: boolean = true):string => {
    const keyValue:string[] = [];

    Object.keys(params).map((data: any) => {
        keyValue.push(`${data}=${params[data]}`);
    });

    return (keyValue.length && `${questionMark?'?':''}${keyValue.join('&')}`) || '';
}

/**
 * This function returns respective API URL & Param_Key to be replaced
 */
 const getApiUrl = (searchType='twitter_search', headers:object = {}):any => {
    switch(searchType) {
        case 'twitter_search':
            return {
                url: TWITTER_SEARCH_API_URL, 
                param_key: [TWITTER_SEARCH_QUERY_KEY, TWITTER_SEARCH_RESULT_TYPE_KEY, ],
                headers
            }
        default:
            return {url: '', param_key: ''};
    }
 }

/**
 * @param {string} url 
 * @param {Object} params 
 * This function adds Param values to the URL 
 */
const urlParams = (url:string, params={}) => {
    let urlChanges = url;
    urlChanges += paramSerialize(params);
    return urlChanges;
}

/**
 * This function calculate the Data Length count
 */
const dataContentCount = (data:object = []) => {
    if(data && typeof data === 'object') {
        return (Array.isArray(data) ? data.length : 1);
    }
    return 0;
}

/**
 * 
 * @param {*} data 
 * This function checks if the JSON object is empty or not
 */
const checkIfObjectIsNotEmpty = (data:object = {}) => {
    if(data && typeof data === 'object' && data.constructor.name === 'Object'){
        return Object.keys(data).length > 0;
    }
    return false;
}

const getValueFromUrlQueryParam = (url:string = '', paramKeys:any = []) => {
    const queryParamValues:any = {};

    if(url && url.length > 0) {
        const urlSplit = url.split('?');
        if(urlSplit.length > 1) {
            url = urlSplit[1];
            
            paramKeys.forEach((keys: string) => {
                if(url.indexOf(keys) >= 0) {
                    queryParamValues[keys] = url.split(`${keys}=`)[1].split('&')[0];
                }
            });
        }
    }

    return queryParamValues;
}

/**
 * This function is to generate Search Query Param for the URL
 * @param paramObject 
 */
const generateQueryParamUrlFromObject = (paramObject:any = {}) => {
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
    generateOAuthHeader,
    generateQueryParamUrlFromObject,
    getApiUrl,
    getValueFromUrlQueryParam,
    paramSerialize,
    percentEncode,
    randomString,
    requestOAuthAccessToken,
    sortObject,
    urlParams,
}