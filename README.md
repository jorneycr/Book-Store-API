<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# BookStore API

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Docker

```bash
$ docker-compose up -d
```

## Migrations

```bash
$ npm run migration:generate migration-name
```

```bash
$ npm run migration:run 
```

## End-Points

```bash
$ POST http://localhost:5000/api/auth/signup

$ POST http://localhost:5000/api/auth/signin

$ POST http://localhost:5000/api/users/setRole/5/3

$ GET http://localhost:5000/api/users

$ POST http://localhost:5000/api/roles

$ GET http://localhost:5000/api/roles

$ POST http://localhost:5000/api/book

$ GET http://localhost:5000/api/book

$ GET http://localhost:5000/api/book/author/5
```
