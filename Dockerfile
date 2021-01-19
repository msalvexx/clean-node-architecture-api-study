FROM node:12
WORKDIR /usr/wwwroot/clean-node-api
COPY ./package.json .  
RUN npm install --only=prod