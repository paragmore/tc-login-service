FROM node:14
WORKDIR /usr/src/app
COPY . .
COPY ./package.json ./
RUN npm install
RUN npm install -g typescript
RUN npm run build
ENV PORT=8000
EXPOSE 8000
CMD [ "npm", "start"]
