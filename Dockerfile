FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV GRAPHQL_URL=http://185.247.185.17:8876/graphql
RUN curl -f ${GRAPHQL_URL} || echo "GraphQL server is not available"

RUN npm run build

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]