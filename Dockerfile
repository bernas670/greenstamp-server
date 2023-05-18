FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src
RUN mkdir -p /app/uploads && \
    chown -R node:node /app/uploads

EXPOSE 443
EXPOSE 80

CMD [ "npm", "start" ]
