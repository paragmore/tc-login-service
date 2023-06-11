FROM node:14
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ..
RUN npm install typescript
EXPOSE 8000
CMD [ "npm", "run", "start"]
