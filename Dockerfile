## === Build Node application === ##
FROM node:8.7.0-alpine AS nodeBuilder
# Add all the files to ./app
ADD . /app
RUN chmod u+wx /app/server
WORKDIR /app/server

RUN npm install
RUN npm config set strict-ssl false
RUN npm config set ca ""
RUN npm config delete ca

RUN rm -rf ./dist
RUN npm run build


## === Build the React application === ##
FROM node:8.7.0-alpine AS reactBuilder
COPY --from=nodeBuilder /app/client ./
# RUN ls
RUN npm install
RUN rm -rf ./build
RUN mkdir build && chmod u+wx ./build
RUN npm run build


## === New Container that will contain Build NODE and REACT code === ##
# Final stage build, this will be the container
# that we will deploy to production
FROM node:8.7.0-alpine
RUN apk --no-cache add ca-certificates

ENV APP_SERVER_HOST 0.0.0.0
# Default PORT value set to 8080
ARG PORT=8080
# ARG PORT's value will be shared by HEROKU when building in server
ENV APP_SERVER_PORT $PORT
ENV NODE_ENV development

# Shift Built NODE code (/dist)
COPY --from=nodeBuilder /app/server/dist ./
COPY --from=nodeBuilder /app/.env.development ./
COPY --from=nodeBuilder /app/server/package.json ./
# For package version control shift the current package-lock.json
# COPY --from=nodeBuilder /app/server/package-lock.json ./
RUN npm install

# Shift Built REACT code (/build)
RUN mkdir -p ./web
COPY --from=reactBuilder /build ./web
COPY --from=reactBuilder package.json ./web
# For package version control shift the current package-lock.json
# COPY --from=reactBuilder package-lock.json ./web
COPY --from=nodeBuilder /app/.env.development ./web
RUN cd ./web && npm install && cd ..

## === Twitter API Keys === ##
# ENV REACT_APP_TWITTER_API_KEY <ENTER_TWITTER_API_KEY>
# ENV REACT_APP_TWITTER_API_SECRET <ENTER_TWITTER_API_SECRET>
# ENV REACT_APP_TWITTER_API_ACCESS_TOKEN <ENTER_TWITTER_API_ACCESS_TOKEN>
# ENV REACT_APP_TWITTER_API_ACCESS_TOKEN_SECRET <ENTER_TWITTER_API_ACCESS_TOKEN_SECRET>

## === Sentry.io API Key === ##
# ENV NODE_APP_SENTRY_TRACKER_KEY <ENTER_NODE_APP_SENTRY_TRACKER_KEY>
# ENV REACT_APP_SENTRY_TRACKER_KEY <ENTER_REACT_APP_SENTRY_TRACKER_KEY>

EXPOSE ${APP_SERVER_PORT}
CMD npm run start