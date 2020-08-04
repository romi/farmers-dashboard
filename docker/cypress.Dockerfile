FROM cypress/base:latest

WORKDIR /cyp
COPY . . 
RUN yarn
CMD yarn start & yarn cypress
