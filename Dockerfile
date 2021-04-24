# Stage 1 building the code
FROM node:lts-alpine as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 final stage with builded code
FROM node:lts-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci --production

COPY --from=builder /usr/app/dist ./dist

ENV PORT=3000 \
    DB_PORT=3306 \
    DB_DRIVER='mysql' \
    DB_HOST='localhost' \
    DB_NAME='zoo' \
    DB_USER='root' \
    DB_PASSWORD=''

CMD node dist/src/index.js