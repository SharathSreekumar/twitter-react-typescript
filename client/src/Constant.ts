const port = 3000;
const COUNTRY_LIST_API_URL = `http://services.groupkt.com/country/get/all`; // Gets list of all the countries
const COUNTRY_ISO2_API_URL = `http://services.groupkt.com/country/get/iso2code/country2_code`; // E.x.: http://services.groupkt.com/country/get/iso2code/IN
const COUNTRY_ISO3_API_URL = `http://services.groupkt.com/country/get/iso3code/country3_code`; // E.x.: http://services.groupkt.com/country/get/iso3code/IND
const COUNTRY_LIST_SEARCH_API_URL = `http://services.groupkt.com/country/search?text=country_name`; // Gets list of all the countries matching the `text` key <country_name>
const ISO2_KEY = `country2_code`;
const ISO3_KEY = `country3_code`;
const LIST_SEARCH_KEY = `country_name`;
const SEARCH_QUERY_PARAM_KEY = `query`;
// const TWITTER_SEARCH_API_URL = `https://api.twitter.com/1.1/search/tweets.json?q=search_query&result_type=search_result_type`;
const TWITTER_SEARCH_API_URL = `https://api.twitter.com/1.1/search/tweets.json`;
const TWITTER_SEARCH_QUERY_KEY = `q`;// `search_query`;
const TWITTER_SEARCH_RESULT_TYPE_KEY = `result_type`; // `search_result_type`;
const TWITTER_API_ACCESS_TOKEN_URL = `https://api.twitter.com/oauth/access_token`;
const CORS_API_URL = `https://cors.io/?u=`;
const LOCAL_CORS_SERVER = `http://localhost:8001/bapi/get-tweets`

export {
    port,
    CORS_API_URL,
    COUNTRY_LIST_API_URL,
    COUNTRY_ISO2_API_URL,
    COUNTRY_ISO3_API_URL,
    COUNTRY_LIST_SEARCH_API_URL,
    ISO2_KEY,
    ISO3_KEY,
    LIST_SEARCH_KEY,
    LOCAL_CORS_SERVER,
    SEARCH_QUERY_PARAM_KEY,
    TWITTER_API_ACCESS_TOKEN_URL,
    TWITTER_SEARCH_API_URL,
    TWITTER_SEARCH_QUERY_KEY,
    TWITTER_SEARCH_RESULT_TYPE_KEY,
}