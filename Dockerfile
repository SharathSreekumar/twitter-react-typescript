# Build Node application
FROM node:8.7.0-alpine AS nodeBuilder
# Add all the files to ./app
ADD . /app
# RUN mkdir -p /app/server
RUN chmod u+wx /app/server
WORKDIR /app/server
# COPY package.json /app/server
# COPY package-lock.json /app/server

# ENV APP_SERVER_HOST https://twitter-react-app.herokuapp.com
# ENV APP_SERVER_HOST 0.0.0.0
# ENV APP_SERVER_PORT 8080
# ENV NODE_ENV development

## Test Twitter Keys ##
ENV REACT_APP_TWITTER_API_KEY OMq4iSoKoEDSvmJRu9DS0KvbG
ENV REACT_APP_TWITTER_API_SECRET Piqn6jA2tJDXdY5LV1XTQIGFQtSFPos16ijzRne1kDSSkWfQD6
ENV REACT_APP_TWITTER_API_ACCESS_TOKEN 701108378983129088-Kn9VLaJ4mcYx3u9j6hJKtNg6WRo11ib
ENV REACT_APP_TWITTER_API_ACCESS_TOKEN_SECRET lgC5nFwJI5bEn4k8pfOKvyijYzgDCHw1k3uQyqoMsP2Xg

## Sentry.io Keys
ENV NODE_APP_SENTRY_TRACKER_KEY bd6d8c1ac8b3490fa41b4710a3572a8c

RUN npm install
RUN npm config set strict-ssl false
RUN npm config set ca ""
RUN npm config delete ca

# COPY . /srv/app/server

# RUN npm run dev
RUN rm -rf ./dist
RUN npm run build
# RUN npm start

# Build the React application
FROM node:8.7.0-alpine AS reactBuilder
COPY --from=nodeBuilder /app/client ./
# RUN ls
RUN npm install
RUN rm -rf ./build
RUN mkdir build && chmod u+wx ./build
RUN npm run build

# Final stage build, this will be the container
# that we will deploy to production
FROM node:8.7.0-alpine
RUN apk --no-cache add ca-certificates

ENV APP_SERVER_HOST 0.0.0.0
ARG PORT=8080
ENV APP_SERVER_PORT PORT
ENV NODE_ENV development

## Test Twitter Keys ##
ENV REACT_APP_TWITTER_API_KEY OMq4iSoKoEDSvmJRu9DS0KvbG
ENV REACT_APP_TWITTER_API_SECRET Piqn6jA2tJDXdY5LV1XTQIGFQtSFPos16ijzRne1kDSSkWfQD6
ENV REACT_APP_TWITTER_API_ACCESS_TOKEN 701108378983129088-Kn9VLaJ4mcYx3u9j6hJKtNg6WRo11ib
ENV REACT_APP_TWITTER_API_ACCESS_TOKEN_SECRET lgC5nFwJI5bEn4k8pfOKvyijYzgDCHw1k3uQyqoMsP2Xg

## Sentry.io Keys
ENV NODE_APP_SENTRY_TRACKER_KEY bd6d8c1ac8b3490fa41b4710a3572a8c

# ARG current_path=$(PWD)

COPY --from=nodeBuilder /app/server/dist ./
COPY --from=nodeBuilder /app/.env.development ./
COPY --from=nodeBuilder /app/server/package.json ./
# COPY --from=nodeBuilder /app/server/package-lock.json ./
RUN npm install

RUN mkdir -p ./web
COPY --from=reactBuilder /build ./web
COPY --from=reactBuilder package.json ./web
COPY --from=nodeBuilder /app/.env.development ./web
# COPY --from=reactBuilder package-lock.json ./web
# COPY --from=reactBuilder /node-modules ./web
RUN cd ./web && npm install && cd ..
# RUN cd ./web 

EXPOSE $PORT
# CMD ["npm", "run", "dev"]
# CMD npm run start:prod
CMD npm run start