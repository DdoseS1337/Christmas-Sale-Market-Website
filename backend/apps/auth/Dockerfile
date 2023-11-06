FROM node:alpine As development

WORKDIR /usr/src/app/backend

COPY backend/package.json ./
COPY backend/tsconfig.json  tsconfig.json
COPY backend/nest-cli.json nest-cli.json

RUN npm install 

COPY backend/apps/auth apps/auth
COPY backend/libs libs

RUN cd apps/auth && npm install 

RUN npm run build auth

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/backend

COPY backend/package.json ./

RUN npm install --prod

COPY --from=development /usr/src/app/backend/dist ./dist

CMD ["node", "dist/apps/auth/main"]
