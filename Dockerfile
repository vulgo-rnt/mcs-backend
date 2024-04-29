FROM node:20-alpine
COPY . ./api
WORKDIR /api
RUN yarn install
EXPOSE 3000
ENTRYPOINT yarn start:dev