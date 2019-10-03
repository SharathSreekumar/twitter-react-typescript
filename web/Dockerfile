FROM node:8.7.0-alpine

# Create app directory and use it as the working directory
RUN mkdir -p /srv/app/twitter-web
WORKDIR /srv/app/twitter-web

COPY package.json /srv/app/twitter-web
COPY package-lock.json /srv/app/twitter-web

RUN npm install 

COPY . /srv/app/twitter-web

CMD [ "npm", "start" ]