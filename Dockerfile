FROM node
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install

EXPOSE 8080
CMD NODE_ENV=prod node main
COPY . .