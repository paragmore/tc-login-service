FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install typescript
CMD [ "npm", "run", "start"]
