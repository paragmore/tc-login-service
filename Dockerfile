FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i --save-dev @types/node

COPY . .

EXPOSE 8000

ENV PORT=8000

CMD ["npm", "start"]
