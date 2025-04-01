FROM node:18.16.0 AS build
WORKDIR /app
ENV GRAPHQL_URL=http://185.247.185.17:8876/graphql
COPY . /app
RUN npm install
RUN curl -f ${GRAPHQL_URL} || echo "GraphQL server is not available"
RUN npm run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/dist /var/www/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]