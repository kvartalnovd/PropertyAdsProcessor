FROM node:12-alpine as builder

WORKDIR /usr/src/app/frontend

#COPY package.json /app/package.json

RUN npm install --only=prod

#COPY . /app

RUN npm run build
