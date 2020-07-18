# This image is optimized for deployment to my (Alex's) personal server,
# and makes assumptions you may not want to make.

FROM node:12.18-alpine

RUN apk add python

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod

COPY dist ./dist

COPY graphql ./graphql

CMD npm start
