FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install express body-parser

COPY . .


EXPOSE 3000
CMD ["npm", "start"]
