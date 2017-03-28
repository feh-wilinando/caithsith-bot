FROM node
WORKDIR /caithsith-bot

COPY index.js .
COPY package.json .

RUN npm install
RUN npm install pm2 -g

CMD pm2 start index.js
