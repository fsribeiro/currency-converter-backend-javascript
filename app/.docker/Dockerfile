FROM node:14.16.0-alpine3.13

WORKDIR /home/node/app

EXPOSE ${PORT}

RUN apk update && apk add bash
RUN npm install -g @nestjs/cli

