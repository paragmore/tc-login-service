FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm run build

COPY . .

EXPOSE 8000

ENV ADDRESS=0.0.0.0 PORT=8000

CMD ["npm", "start"]
