FROM node:14.7.0-alpine3.10 as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn 

COPY . .
RUN yarn build


FROM nginx:1.19.1-alpine

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]