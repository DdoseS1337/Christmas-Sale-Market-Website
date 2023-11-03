
FROM node:alpine As development


WORKDIR /usr/src/app


COPY package.json ./
COPY tsconfig.json  tsconfig.json

RUN npm install


COPY apps/supplier-service apps/supplier-service
COPY libs libs

RUN cd apps/supplier-service && npm install

RUN npm run build

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/supplier-service/main"]
