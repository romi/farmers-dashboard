FROM node:14.7.0-alpine3.10 as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
COPY ./nginx.conf /nginx.conf
RUN yarn build


FROM nginx:1.19.1-alpine

COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]