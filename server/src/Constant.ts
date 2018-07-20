const CORS_API_URL = `https://cors.io/?u=`;
const PORT = 3000;
// const TWITTER_SEARCH_API_URL = `https://api.twitter.com/1.1/search/tweets.json?q=search_query&result_type=search_result_type`;
const TWITTER_SEARCH_API_URL = `https://api.twitter.com/1.1/search/tweets.json`;
const TWITTER_SEARCH_QUERY_KEY = `q`;// `search_query`;
const TWITTER_SEARCH_RESULT_TYPE_KEY = `result_type`; // `search_result_type`;
const TWITTER_API_ACCESS_TOKEN_URL = `https://api.twitter.com/oauth/access_token`;

export {
    CORS_API_URL,
    PORT,
    TWITTER_API_ACCESS_TOKEN_URL,
    TWITTER_SEARCH_API_URL,
    TWITTER_SEARCH_QUERY_KEY,
    TWITTER_SEARCH_RESULT_TYPE_KEY,
}