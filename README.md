# codetest

#### Paths
- /api/v1 - API server to create users and campaigns to vote
- / - Page for displaying campaigns with real time update

#### Config
urls and ports stored at config.json

#### Dependencies:
- docker compose
- nodemon (dev)

---
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
