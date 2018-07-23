# twitter_react_typescript
Create .env, then enter:
> APP_SERVER_PORT=8001 __
> REACT_APP_PORT=3005 __
Also define the Product environment: __
> REACT_APP_HOST_ENVIRONMENT=development __
options are development / production / test __

Also enter Twitter credentials:
> REACT_APP_TWITTER_API_KEY=<Twitter API key> __
> REACT_APP_TWITTER_API_SECRET=<Twitter API Secret key> __
> REACT_APP_TWITTER_API_ACCESS_TOKEN=<Twitter Access Token> __
> REACT_APP_TWITTER_API_ACCESS_TOKEN_SECRET=<Twitter Access Token Secret> __

For Sentry Key:
> REACT_APP_SENTRY_TRACKER_KEY=<Sentry_Tracker_key>

Build Docker compose:
> docker-compose up --build

Note: for `docker-compose` command to run, install `docker` & `docker-compose`
__Reference:
https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04

____
To build independently:__
- server/:
For production:
> npm start
or
For development:
> npm run dev

- client/:__
> npm start

# Heroku
Reference:__
https://devcenter.heroku.com/articles/local-development-with-docker-compose
https://devcenter.heroku.com/articles/container-registry-and-runtime