FROM node:14.17

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /app
RUN npm install -g tsc && npm install -g concurrently && npm install -g typescript && npm install -g nestjs/cli
RUN npm install
RUN export port=8000
RUN ls
RUN npm run build

EXPOSE 8000
CMD [ "npm", "start"]
