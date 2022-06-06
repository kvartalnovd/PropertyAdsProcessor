FROM node:13.12.0-alpine

WORKDIR /usr/src/app/frontend

ENV PATH /app/node_modules/.bin:$PATH

#COPY package.json /app/package.json

RUN npm install --only=prod

#COPY . /app

RUN npm run build




FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add /app/node_modules/.bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]