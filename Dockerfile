FROM node:14
WORKDIR /usr/src/app
COPY . .
COPY package.json /usr/src/app
RUN npm install --supress -warnings
ARG env_name
ARG env_port
ENV NODE_ENV=$env_name
ENV PORT=$env_port
EXPOSE $env_port
CMD [ "npm", "start"]
