<<<<<<< HEAD
FROM node:12-alpine

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
=======
FROM node:14
WORKDIR /usr/src/app
COPY . .
COPY ./package.json ./
RUN npm install 
EXPOSE 8000
CMD [ "npm", "run", "start"]
>>>>>>> c98dff3bb3575fb76dd5a8b5cf981e470b833712
