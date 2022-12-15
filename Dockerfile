FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./certificates ./certificates
RUN mkdir -p /app/uploads && \
    chown -R node:node /app/uploads

ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]
