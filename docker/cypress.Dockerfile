FROM cypress/base:latest

WORKDIR /cyp

COPY . . 
RUN yarn && yarn build 

CMD ["yarn", "start" ,"&" ,"yarn" ,"cypress"]
