FROM cypress/base:latest

WORKDIR /cyp

RUN yarn global add serve

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn build 

CMD  serve -s build -l 3000 & yarn cypress 