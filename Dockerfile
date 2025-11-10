FROM node:22-alpine AS build

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /frontend/www /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
