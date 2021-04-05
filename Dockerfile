# Stage 1 building the code
FROM node:lts-alpine as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 final stage with builded code
FROM node:lts-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/app/dist ./dist

ENV PORT=3000
ENV DB_PORT=3306
ENV DB_DRIVER='mysql'
ENV DB_HOST='localhost'
ENV DB_NAME='root'
ENV DB_USER=''
ENV DB_PASSWORD='zoo'

CMD node dist/src/index.js