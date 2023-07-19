FROM node:14
WORKDIR /usr/src/app
RUN npm install
COPY . .
CMD ["node", "./bin/www"]