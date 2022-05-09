## Clean Architecture

First of all, let me admit [this article](https://mannhowie.com/clean-architecture-node) is inspired to develop this project. Uncle Bob's famous [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) is a way to write resilient software.

Resilient software is divided into layers, underpinned by business logic and is independent of technologies. It should be:

1. **Testable:** Can be tested without external dependencies.
2. **Independent of UI:** You can easily switch CLI for Web or RasberryPi.
3. **Independent of Database:** Switch out SQL [MySQL or PostgreSQL] for MongoDB.
4. **Independent of Frameworks:** Libraries and frameworks should be treated as tools and not dependencies.
5. **Independent of any external agency:** Business rules don't know anything about outside world.

In practice, choice of technology should be the last decision you make or code you write (e.g. database, platform, framework).

By following clean architecture, you can write software today that can be easily switched out for different technologies in the future.

## Practical Example using with MongoDB

This is an example of a simple CRUD application with layered software and separation of business logic vs technology.

It is a simple API for creating `students` and includes validation, persistence and UI. It includes examples using different interfaces (CLI and Web), databases (in memory, MongoDB, SQL), and models (validation).

[Click here for github repo.](https://github.com/waiphyo285/itemplate-backend)

_Note: this application is different to the Clean Architecture diagram above but attempts to achieve the same outcome._

### Software layer overview

The application is separated into three layers. Inner layers cannot depend on outer layers and outer layers should only depend one layer in:

- **Inner Layer**
  - **Models**. Our choice of database (in memory, MongoDB, SQL), this is independent of the model. Note that in Clean Architecture this is considered an outer layer framework, but for practical applications I find it easier to place it inner and have the controllers layer depend on it rather than injecting it in.
- **Middle Layer**
  - **Controllers**. Handles transfer between the database (like an ORM). Depends on the model to validate and create the entity in database. The key is to have a consistent & custom API that all outer layers communicate with. Testing here will ensure that replacing or using multiple databases doesn't break anything further upstream.
- **Outer Layer**
  - **src**. Represents the UI or interface (Web or CLI). It communicates only with the controllers layer.
