# Itemplate Backend

<img src="./public/images/readme/readme-cover.png" width="480" height="270" >

## Getting Started

I am introduced a simple API template for backend developers using clean architecture based on express application. This article is meant to help you with improved code.

**Main features**

The template supports admin dashboard, access menu permission based on role, switch custom theme, secure data with authN and authZ, integrate with chart.js lib, generate easily CRUD API, upload media files, cache with redis memory, switch multi databases and design for TDD.

**The followings must be pre-installed on your machine:**

Node.js, MongoDB, MySQL, Redis

**Clone itemplate repository**

```bash
git clone https://github.com/waiphyo285/itemplate-backend.git
```

**Navigate root directory and install dependencies**

```bash
npm install
```

**Migrate MySQL database and tables**

```bash
npx knex migrate:latest
npx knex seed:run
```

**Run app and then go to browser**

```bash
npm run dev
localhost:6060
```

**TDD `./../.spec.js` in controllers**

```
npm run test
```

**CLI commands in src/cli**

```bash
node index
node index --index
node index --show=623210497fc2cb28840d1448
```

## Clean Architecture

First of all, let me admit [this article](https://mannhowie.com/clean-architecture-node) is inspired to develop this project. Uncle Bob's famous [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) is a way to write resilient software.

Resilient software is divided into layers, underpinned by business logic and is independent of technologies. It should be:

1. **Testable:** Can be tested without external dependencies.
2. **Independent of UI:** You can easily switch CLI for Web or RasberryPi.
3. **Independent of Database:** Switch out SQL [MySQL or PostgreSQL] for MongoDB.
4. **Independent of Frameworks:** Libraries and frameworks should be treated as tools and not dependencies.
5. **Independent of any external agency:** Business rules don't know anything about outside world.

In practice, choice of technology should be the last decision you make or code you write (e.g. database, platform, framework). By following clean architecture, you can write software today that can be easily switched out for different technologies in the future.

\_Note: this application is different to the Clean Architecture diagram above but attempts to achieve the same outcome.
