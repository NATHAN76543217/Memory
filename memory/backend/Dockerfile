FROM alpine:latest

RUN apk add --update npm
COPY server/. /server
WORKDIR /server
RUN npm install
CMD ["npm", "start"]