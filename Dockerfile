FROM node:14
WORKDIR /app
ADD . /app
RUN npm install
RUN npm install typescript
CMD [ "npm", "run", "start"]
