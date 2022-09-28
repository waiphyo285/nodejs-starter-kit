# Itemplate Backend

<img src="./public/images/readme/readme-cover.jpg" >

## Getting Started

First of all, let me admit [this article](https://mannhowie.com/clean-architecture-node) is inspired to develop this project. Uncle Bob's famous [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) is a way to write resilient software.

I am introduced a simple API template for backend developers using clean architecture based on express application. This template is meant to help you with improved code.

**Main features**

- admin dashboard with bootstrap v4,
- access menu permission based on role,
- switch custom theme (action, comedy, ..)
- secure data with authN and authZ,
- integrate with chart.js library,
- generate easily CRUD API,
- upload media files,
- cache in redis memory,
- switch multi databases and,
- design for test driven development.

**The followings must be pre-installed on your machine:**

- Node.js,
- MongoDB,
- MySQL,
- Redis

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

\_Note: this application is different to the Clean Architecture diagram above but attempts to achieve the same outcome.
