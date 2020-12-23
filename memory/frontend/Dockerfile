FROM alpine:latest

RUN apk add --update npm
WORKDIR /app
COPY client/package.json .
RUN npm install
RUN npm install -g serve
COPY client/. .
RUN npm run build
CMD serve -s build