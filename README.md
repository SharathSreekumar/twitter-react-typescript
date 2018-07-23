# twitter_react_typescript
Create .env, then enter:
> APP_SERVER_PORT=8001 <br/>
> REACT_APP_PORT=3005 <br/>
Also define the Product environment: <br/>
> REACT_APP_HOST_ENVIRONMENT=development <br/>
options are development / production / test <br/>

Also enter Twitter credentials:
> REACT_APP_TWITTER_API_KEY=<Twitter API key> <br/>
> REACT_APP_TWITTER_API_SECRET=<Twitter API Secret key> <br/>
> REACT_APP_TWITTER_API_ACCESS_TOKEN=<Twitter Access Token> <br/>
> REACT_APP_TWITTER_API_ACCESS_TOKEN_SECRET=<Twitter Access Token Secret> <br/>

For Sentry Key:
> REACT_APP_SENTRY_TRACKER_KEY=<Sentry_Tracker_key>

Build Docker compose:
> docker-compose up --build

Note: for `docker-compose` command to run, install `docker` & `docker-compose`
<br/>Reference:
https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04

<br/><br/>
To build independently:<br/>
- server/:
For production:
> npm start
or
For development:
> npm run dev

- client/:<br/>
> npm start

# Heroku
Reference:<br/>
https://devcenter.heroku.com/articles/local-development-with-docker-compose
https://devcenter.heroku.com/articles/container-registry-and-runtime