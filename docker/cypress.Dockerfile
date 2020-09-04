FROM node:14.7.0-alpine3.10 as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
COPY ./nginx.conf /nginx.conf
RUN yarn build

FROM cypress/base:latest

WORKDIR /cy

RUN apt-get install nginx

COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD  nginx & yarn cypress
