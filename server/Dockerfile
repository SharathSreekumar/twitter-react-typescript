FROM node:8.7.0-alpine

# Create app directory
RUN mkdir -p /srv/app/twitter-server
WORKDIR /srv/app/twitter-server

COPY package.json /srv/app/twitter-server
# COPY package-lock.json /srv/app/twitter-server

ENV APP_SERVER_HOST 0.0.0.0
ENV APP_SERVER_PORT 8001
ENV NODE_ENV development
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

RUN npm install
RUN npm config set strict-ssl false
RUN npm config set ca ""
RUN npm config delete ca

COPY . /srv/app/twitter-server

CMD ["npm", "run", "dev"]