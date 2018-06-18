const port = 3000;
const COUNTRY_LIST_API_URL = `http://services.groupkt.com/country/get/all`; // Gets list of all the countries
const COUNTRY_ISO2_API_URL = `http://services.groupkt.com/country/get/iso2code/country2_code`; // E.x.: http://services.groupkt.com/country/get/iso2code/IN
const COUNTRY_ISO3_API_URL = `http://services.groupkt.com/country/get/iso3code/country3_code`; // E.x.: http://services.groupkt.com/country/get/iso3code/IND
const COUNTRY_LIST_SEARCH_API_URL = `http://services.groupkt.com/country/search?text=country_name`; // Gets list of all the countries matching the `text` key <country_name>
const ISO2_KEY = `country2_code`;
const ISO3_KEY = `country3_code`;
const LIST_SEARCH_KEY = `country_name`;
const SEARCH_QUERY_PARAM_KEY = `query`;

export {
    port,
    COUNTRY_LIST_API_URL,
    COUNTRY_ISO2_API_URL,
    COUNTRY_ISO3_API_URL,
    COUNTRY_LIST_SEARCH_API_URL,
    ISO2_KEY,
    ISO3_KEY,
    LIST_SEARCH_KEY,
    SEARCH_QUERY_PARAM_KEY,
}