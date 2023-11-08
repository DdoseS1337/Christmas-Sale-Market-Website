FROM node:alpine As development

WORKDIR /usr/src/app

COPY backend/package.json ./
COPY backend/tsconfig.json  tsconfig.json
COPY backend/nest-cli.json nest-cli.json

RUN npm install 

COPY backend/apps/telegram-bot apps/telegram-bot
COPY backend/libs libs

RUN cd apps/telegram-bot && npm install 

RUN npm run build telegram-bot

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY backend/package.json ./

RUN npm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/telegram-bot/main"]
