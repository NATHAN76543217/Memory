FROM alpine:latest

RUN apk add --update npm
COPY client/. /app
WORKDIR /app
RUN npm install
RUN npm install -g serve
RUN npm run build
CMD serve -s build