FROM cypress/base:latest

WORKDIR /cyp

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn build 

CMD  yarn start &  yarn cypress