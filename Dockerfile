FROM node
WORKDIR /caithsith-bot

COPY index.js .
COPY package.json .

RUN npm install

CMD node index.js
