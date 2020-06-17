# Production Build

# Stage 1: Build react client
FROM node:10.16-alpine as client
WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN yarn install
COPY client/ ./
RUN npm run build

# Stage 2 : Build Server
FROM node:10.16-alpine
WORKDIR /usr/src/app/
COPY --from=client /usr/app/client/build/ ./client/build/
WORKDIR /usr/src/app/server/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

ENV PORT 8000
EXPOSE 8000
CMD ["npm", "start"]