FROM node:18.0-slim
WORKDIR /pratilipi/user
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]