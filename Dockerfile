FROM node
COPY index.js /caithsith-bot
COPY package.json /caithsith-bot

ENV MYSQL_HOST mysqldb

WORKDIR /caithsith-bot
RUN npm install

CMD npm start
