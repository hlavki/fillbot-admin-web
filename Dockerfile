FROM node:alpine AS builder
RUN apk add --no-cache jq
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build:prod

FROM nginx:alpine
COPY default.conf.template /etc/nginx/templates/
COPY --from=builder /app/dist/fillbot-web /usr/share/nginx/html
