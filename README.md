# codetest

## dev setup
Run docker compose for mongo and redis
```
docker-compose up
```

Run nodemon for server
```
npm start
```

## prod setup
Run docker compose for mongo, redis and server
```
docker-compose -f docker-compose-prod.yml up --build
```
