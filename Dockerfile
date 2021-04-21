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

ENV PORT=3000
ENV DB_PORT=3306
ENV DB_DRIVER='mysql'
ENV DB_HOST='localhost'
ENV DB_NAME='zoo'
ENV DB_USER='root'
ENV DB_PASSWORD=''

CMD node dist/src/index.js