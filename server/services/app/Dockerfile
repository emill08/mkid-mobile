FROM node:18-alpine
WORKDIR /usr/local/app
COPY . .
RUN npm install
RUN npm install -g nodemon
RUN npx sequelize-cli db:migrate --env=production
RUN npx sequelize-cli db:seed:all --env=production
CMD ["nodemon", "app.js"]
EXPOSE 4002