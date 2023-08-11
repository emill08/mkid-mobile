FROM node:18-alpine
WORKDIR /usr/local/app
COPY . .
RUN npm install
RUN npm install -g nodemon
CMD ["nodemon", "app.js"]
EXPOSE 4001