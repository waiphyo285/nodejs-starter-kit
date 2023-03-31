<img src="./public/images/readme/readme-cover.jpg" >

## Getting Started

First of all, let me admit [this article](https://mannhowie.com/clean-architecture-node) is inspired to develop this project. Uncle Bob's famous [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) is a way to write resilient software.

I am introduced a simple API template for backend developers using clean architecture based on express application. When you choose Node.js + MongoDb as your backend stack, the template is based on the following frameworks and libraries to completely cover a project that is ready for production.

## Demo Video

https://user-images.githubusercontent.com/51906662/227724690-de3e7e44-1aa4-45e8-8064-2dd9d80ef153.mp4

<br/>

[**Express**](https://bit.ly/3FeNkRi)

-   a powerful and flexible framework that makes it easy to build web applications and APIs using Node.js. Its minimalist approach and large ecosystem make it a popular choice for developers who want to build scalable and maintainable web applications.

[**Mongoose**](https://bit.ly/3TA0ZGT)

-   a powerful and flexible ODM library for MongoDB and Node.js that provides a rich set of tools for working with data. Its schema-based approach, data validation tools, and powerful

[**Bootstrap**](https://bit.ly/3VQCqXA)

-   a popular front-end framework for building responsive and mobile-first web applications. It was originally developed by Twitter and is now maintained by the open-source community.

[**Passport**](https://bit.ly/3W24cAr)

-   an open-source authentication middleware for Node.js. It provides a simple and modular approach to authentication that makes it easy to add user authentication to web applications.

[**Multer**](https://bit.ly/3NhgEZr)

-   a popular package that provides middleware for handling multipart/form-data in Node.js. It's commonly used in web applications to handle file uploads from users.

[**JWT**](https://bit.ly/3W2dNrg)

-   in the context of Node.js, the jsonwebtoken package is a popular npm package that provides a simple way to create and verify JWTs.

[**Mocha**](https://bit.ly/3f95w3Q)

-   a testing framework for Node.js applications. It's designed to provide a simple and flexible way to write and run tests, with support for a variety of testing styles and frameworks.

**The followings must be pre-installed on your machine:**

-   Node.js,
-   MongoDB,
-   Redis

**Clone itemplate repository**

```bash
git clone https://github.com/waiphyo285/nodejs-starter-kit.git
```

**Visit Public Postman Collection**

```
https://documenter.getpostman.com/view/10018411/2s83mbr5iK
```

**Navigate root directory and install dependencies**

```bash
npm install
```

**Copy `.env.example` to `.env`**

```bash
cp .env.example .env
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

// Next features

-   https://www.npmjs.com/package/ratelimiter
