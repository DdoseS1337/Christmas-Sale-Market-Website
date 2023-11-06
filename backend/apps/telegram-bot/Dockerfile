
FROM node:alpine As development


WORKDIR /usr/src/app/backend


COPY package.json ./
COPY tsconfig.json  tsconfig.json
COPY nest-cli.json nest-cli.json


COPY apps/telegram-bot apps/telegram-bot
COPY libs libs


RUN npm install -r

RUN npm run build telegram-bot

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/backend

COPY package.json ./

RUN npm install --prod

COPY --from=development /usr/src/app/backenddist ./dist

CMD ["node", "dist/apps/telegram-bot/main"]
