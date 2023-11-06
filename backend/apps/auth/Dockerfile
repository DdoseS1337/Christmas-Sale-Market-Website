
FROM node:alpine As development


WORKDIR /usr/src/app


COPY package.json ./
COPY tsconfig.json  tsconfig.json
COPY nest-cli.json nest-cli.json


COPY apps/auth apps/auth
COPY libs libs

RUN npm install -r

RUN npm run build auth

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]
