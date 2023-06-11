FROM node:12
WORKDIR /app
ADD . /app
COPY ./package.json ./
RUN npm install
RUN npm install -g typescript
RUN export port=8000
RUN npm run build

EXPOSE 8000
CMD [ "npm", "start"]
