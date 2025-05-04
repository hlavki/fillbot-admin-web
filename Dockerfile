FROM node:22-alpine AS builder
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build:prod

FROM nginxinc/nginx-unprivileged:stable-alpine
COPY config-environment.sh /docker-entrypoint.d/
COPY default.conf.template /etc/nginx/templates/
COPY --from=builder --chown=nginx:0 /app/dist/admin-web /usr/share/nginx/html
