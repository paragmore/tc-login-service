FROM node:14.17
WORKDIR /usr/src/app
ADD . /app
RUN npm install -g typescript && npm install -g nestjs/cli
RUN npm install
RUN export port=8000
RUN npm run build

EXPOSE 8000
CMD [ "npm", "start"]
