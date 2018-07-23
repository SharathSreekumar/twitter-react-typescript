FROM node:8.7.0-alpine

# Create app directory
RUN mkdir -p /srv/app/twitter-server
WORKDIR /srv/app/twitter-server

COPY package.json /srv/app/twitter-server
COPY package-lock.json /srv/app/twitter-server

RUN npm install

COPY . /srv/app/twitter-server

CMD ["npm", "run", "dev"]