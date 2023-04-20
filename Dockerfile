FROM node:alpine AS builder
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build:prod

FROM nginx:alpine
COPY default.conf.template /etc/nginx/templates/
COPY --from=builder /app/dist/admin-web /usr/share/nginx/html
