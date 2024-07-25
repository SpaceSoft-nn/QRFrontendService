# build stage
FROM node:18.16.0-alpine as build
WORKDIR /app
COPY . /app
RUN npm install 
RUN npm run build