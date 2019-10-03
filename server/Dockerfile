FROM node:8.7.0-alpine

# Create app directory
RUN mkdir -p /srv/app/twitter-server
WORKDIR /srv/app/twitter-server

COPY package.json /srv/app/twitter-server
COPY package-lock.json /srv/app/twitter-server

# ENV APP_SERVER_HOST https://twitter-react-app.herokuapp.com
ENV APP_SERVER_HOST 0.0.0.0
ENV APP_SERVER_PORT 8001
ENV NODE_ENV development
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

## Test Twitter Keys ##
# ENV REACT_APP_TWITTER_API_KEY QMdFiWEGqsOjVoS4cuA7pHM0T
# ENV REACT_APP_TWITTER_API_SECRET UcLsZmxy57qw8H3st6jzu8hHDsOcgpHfNa9oDjlVbRwtJu9mVY
# ENV REACT_APP_TWITTER_API_ACCESS_TOKEN "701108378983129088-eRAqTGv11LCX7zxv92knbZw1zDNq0k0"
# ENV REACT_APP_TWITTER_API_ACCESS_TOKEN_SECRET r0s5p7mBPAXicLhtFg2yUq65mfCkuJkkr3A7eh8fYpqyZ

## Sentry.io Keys
# ENV NODE_APP_SENTRY_TRACKER_KEY bd6d8c1ac8b3490fa41b4710a3572a8c

RUN npm install
RUN npm config set strict-ssl false
RUN npm config set ca ""
RUN npm config delete ca

COPY . /srv/app/twitter-server

CMD ["npm", "run", "dev"]