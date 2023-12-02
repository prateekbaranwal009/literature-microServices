FROM node:18.0-slim
WORKDIR /pratilipi/event
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
CMD [ "npm", "run", "start" ]