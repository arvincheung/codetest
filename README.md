# codetest
---
## dev setup
Run docker compose for mongo
```
docker-compose up
```

Run nodemon for server
```
npm start
```
---
## prod setup
Run docker compose for both mongo and server
```
docker-compose -f docker-compose-prod.yml up --build
```
