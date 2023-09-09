FROM node:18-alpine AS builder
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build:prod

FROM nginxinc/nginx-unprivileged:stable-alpine
COPY default.conf.template /etc/nginx/templates/
COPY --from=builder /app/dist/admin-web /usr/share/nginx/html
