# This image is optimized for deployment to my (Alex's) personal server,
# and makes assumptions you may not want to make.

FROM node:12.18-alpine

EXPOSE 5000

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
COPY public ./public

COPY scripts ./scripts
# building here so that appropriate env variables can be inserted outside of CI
CMD yarn start:prod
