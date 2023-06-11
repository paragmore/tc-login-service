FROM node:14
WORKDIR /app
ADD . /app
COPY ./package.json ./
RUN npm install
RUN npm install -g typescript
ENV PORT 8001
RUN export PORT=8001
RUN npm run build

EXPOSE 8001
CMD [ "npm", "start"]
