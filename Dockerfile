FROM node:14
WORKDIR /app
ADD . /app
COPY ./package.json ./
RUN npm install
RUN npm install -g typescript
RUN npm run build
CMD [ "npm", "start"]
