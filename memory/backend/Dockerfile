FROM alpine:latest

RUN apk add --update npm
WORKDIR /server
COPY ./server/package.json .
RUN npm install
COPY server/. .
CMD ["npm", "start"]