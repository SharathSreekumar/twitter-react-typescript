
FROM node:8.7.0-alpine

# Create app directory and use it as the working directory
RUN mkdir -p /srv/app/twitter-client
WORKDIR /srv/app/twitter-client

COPY package.json /srv/app/twitter-client
COPY package-lock.json /srv/app/twitter-client

RUN npm install 

COPY . /srv/app/twitter-client

CMD [ "npm", "start" ]