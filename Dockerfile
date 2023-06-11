FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
RUN npm run build
ENV PORT=8000
EXPOSE 8000
CMD [ "npm", "start"]
