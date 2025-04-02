FROM node:20-alpine AS build
WORKDIR /react-app

ARG GRAPHQL_URL
ENV GRAPHQL_URL=${GRAPHQL_URL}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN echo "=== Checking project structure ===" && \
	ls -la && \
	echo "=== Checking src directory ===" && \
	ls -la src && \
	echo "=== Checking pages directory ===" && \
	ls -la src/pages && 

RUN npm run build

FROM nginx:alpine
COPY --from=build /react-app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]