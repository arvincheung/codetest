FROM node
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install

EXPOSE 8080
CMD node main
COPY . .