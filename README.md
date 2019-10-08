# twitter_react_typescript
Create .env, then enter:
> APP_SERVER_PORT=8001

> REACT_APP_PORT=3005

Also define the Product environment:

> REACT_APP_HOST_ENVIRONMENT=development

options are development / production / test

Also enter Twitter credentials:

> REACT_APP_TWITTER_API_KEY=<Twitter API key>

> REACT_APP_TWITTER_API_SECRET=<Twitter API Secret key>

> REACT_APP_TWITTER_API_ACCESS_TOKEN=<Twitter Access Token>

> REACT_APP_TWITTER_API_ACCESS_TOKEN_SECRET=<Twitter Access Token Secret>

For Sentry Key:

> REACT_APP_SENTRY_TRACKER_KEY=<Sentry_React_Tracker_key>

> NODE_APP_SENTRY_TRACKER_KEY=<Sentry_Node_Tracker_key>

Build Docker compose:

> docker-compose up --build

Note: for `docker-compose` command to run, install `docker` & `docker-compose`.

Reference:
https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04


To build independently:

- server/:

> npm start # For production

or

> npm run dev # For development


- client/:

> npm start

# Heroku
Reference:

https://devcenter.heroku.com/articles/local-development-with-docker-compose

https://devcenter.heroku.com/articles/container-registry-and-runtime

## Setting up for Heroku:

Create heroku.yml and Procfile in root folder:
In heroku.yml:

>
build:
  docker:
    server: ./server/Dockerfile.server
    web: ./web/Dockerfile.web
run:
  server: npm run start
  web: npm run start


In Procfile:
> 
web: npm start
server: npm start


## Run the following commands:

Create an empty Heroku server:

Now run the following commands:

> heroku login
> heroku container:login
> heroku stack:set container --app <heroku-app-name>
> heroku container:push server web --recursive --app <heroku-app-name>
> heroku container:release server web


If you are using another branch, please not that in order for the Heroku Build and deployment to work you need to push in master Branch.
To do that,
> git push heroku <your-local-branch-name>:master
Reference: https://devcenter.heroku.com/articles/git#deploying-code