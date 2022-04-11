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
  - **Models**. Handles the creation, validation and reading of our entities (students). Note that this should be custom logic and not include the database implementation of models (e.g. in Mongoose ORM, their models should be encapsulated in the database layer below). Our model schemas live here.
  - **Database**. Our choice of database (in memory, MongoDB, SQL), this is independent of the model. Note that in Clean Architecture this is considered an outer layer framework, but for practical applications I find it easier to place it inner and have the controllers layer depend on it rather than injecting it in.
- **Middle Layer**
  - **Controllers**. Handles transfer between the database (like an ORM). Depends on the model to validate and create the entity in database. The key is to have a consistent & custom API that all outer layers communicate with. Testing here will ensure that replacing or using multiple databases doesn't break anything further upstream.
- **Outer Layer**
  - **src**. Represents the UI or interface (Web or CLI). It communicates only with the controllers layer.

### Example application structure

<details>
  <summary>Inner Layer</summary>

```bash
models                    // create new entity by validating payload and returning new read only object
  L validations/students
    L schema.js           //

database                  // database connection and adapter
  L memory                // in memory JSON
    L students.js
  L mongodb               // mongodb alternative
    L connection.js       // connection library
    L seeds               // seed library
      L students-seeds.js // async seed students database
    L models
      L student.js        /** models specific to mongodb. this is different to our business
                          * logic models which handle tests and validation
                          */
```

</details>

---

<details>
  <summary>Middle Layer</summary>

```bash
controllers               // think of it as our internal ORM (logic for our use-cases lies here)
  L students
    L index.js            // other controllers and src rely on this API findData, listData, etc.
    L memory              // in memory
      L index.js          // expose the memory implementation of findData, listData, etc.
      L serializer.js     // serializes to database specific properties
    L mongodb             // mongodb ORM
      L index.js          // uses mongoose implementation of findData, listData, etc.
      L serializer.js     // serializes _id to id
    L postgres            // TODO: Illustrative
```

</details>

---

<details>
  <summary>Outer Layer</summary>

```bash
src
  L cli
    L index.js
  L web                   // express webserver
    L routes
      L api/index.js      // api routes for REST service
      L pages/*.js        // page routes for the dashboard
      L fils/*.js         // file routes for phyical content
    L index.js            // depends on routes
```

</details>

---

### Practical approach

In practice, we can defer technology decisions by writing our application in the following order:

1. Start with models, schema and validation. Write test spec.
2. Defer database decision by using in-memory JSON store
3. Create a controllers API that depends on model and in-memory database. Write test spec.
4. First tech decision: UI interface (e.g. web or CLI). Depend on above controllers layer. Write integration test spec.
5. Second tech decision: Database choice (MongoDB, SQL). Replace in-memory database store. Write controllers methods specific to the database choice. Ensure previously written test specs pass.

### Models

While the model schema is dependent on a validation library and breaks the Clean rules, I find it easier to understand the model by having the schema inside the model. (Note: see the repo for an example of how the validator could be separated into its own software entity).

<details>
  <summary>Sample Code</summary>

```js
const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string()
    .required()
    .error(() => "must have name as string"),
  age: Joi.number().error(() => "age must be a number"),
  grade: Joi.number().error(() => "grade must be a number"),
  prefect: Joi.boolean().error(() => "prefect must be a boolean"),
});
```

</details>

---

### Controllers

The controllers layer is one of the most important. We should feel confident to easily replace DBs.

Here we need three key components

1. API and test spec
2. Serializers to adapt custom database to our model schema
3. Database implementation of the API and passing of test

Start with how we think the outer layers will communicate with the controllers layer and what they should expect to get.

<details>
  <summary>Sample Code</summary>

```js
const chai = require("chai");
const expect = chai.expect;
const studentsDb = require("./index");

describe("studentsDb", () => {
  beforeEach(async () => {
    await studentsDb.dropAll();
    const howie = {
      name: "howie",
      age: 16,
      grade: 11,
      prefect: true,
    };
    const bill = {
      name: "bill",
      age: 18,
      grade: 11,
      prefect: false,
    };
    await studentsDb.addData(howie);
    await studentsDb.addData(bill);
  });

  it("drops collection", async () => {
    await studentsDb.dropAll();
    const input = await studentsDb.listData();
    const inputLength = input.length;
    const actualLength = 0;
    expect(inputLength).to.equal(actualLength);
  });

  it("lists students", async () => {
    const input = await studentsDb.listData();
    const inputLength = input.length;
    const actualLength = 2;
    expect(inputLength).to.equal(actualLength);
  });

  it("finds single student by id", async () => {
    const input = await studentsDb.listData();
    const firstId = input[0]._id;

    const findInput = await studentsDb.findData("id", firstId);
    const inputId = findInput._id;
    const actualId = firstId;
    expect(inputId).to.eql(actualId);
  });

  it("finds many student by properties", async () => {
    const input = await studentsDb.findDataBy({ grade: 11 });
    const inputName = input.map((el) => el.name);
    const actualName = ["howie", "bill"];
    expect(inputName).to.eql(actualName);
  });

  it("inserts a student", async () => {
    let input = {
      name: "felix",
      grade: 10,
      age: 16,
    };
    const newStudent = await studentsDb.addData(input);
    inputOjb = {
      ...input,
      profile_images: [],
      prefect: false,
    };
    const actualObj = {
      profile_images: [],
      prefect: false,
      name: "felix",
      grade: 10,
      age: 16,
    };
    expect(inputOjb).to.eql(actualObj);
  });

  it("deletes a student", async () => {
    const students = await studentsDb.listData();
    const firstId = students[0]._id.toString();
    const validInput = await studentsDb.deleteData(firstId);
    expect(validInput).to.instanceOf(Object);

    const newStudents = await studentsDb.listData();
    const inputLength = newStudents.length;
    const actualLength = 1;
    expect(inputLength).to.equal(actualLength);
  });
});
```

</details>

---

Write a serializer which adapts the custom database schema with our model schema.

<details>
  <summary>Sample Code</summary>

```js
const single = (dataObj) => {
  // prevent key
  return dataObj;
};

const serializer = (data) => {
  if (!data) {
    return null;
  } else if (Array.isArray(data)) {
    return data.map(single);
  } else {
    return single(data);
  }
};

module.exports = serializer;
```

</details>

---

Write custom database implementation of the test spec API. Here is an example of an in-memory implementation (which you should start with) and a MongoDB version. Note: the advantage of writing a test spec is you can focus on simply writing code that just has to work.

#### In-memory controllers:

<details>
  <summary>Sample Code</summary>

```js
let STUDENTS = require("../../../databases/memory/students");
const utils = require("../../../helpers/common");
const serialize = require("./serializer"); // switch custom

const listData = () => {
  return Promise.resolve(serialize(STUDENTS));
};

const findData = (prop, val) => {
  const student = STUDENTS.find((student) => student[prop] == val);
  return Promise.resolve(serialize(student));
};

const findDataBy = (prop, val) => {
  const student = STUDENTS.filter((student) => student[prop] == val);
  return Promise.resolve(serialize(student));
};

const addData = (dataObj) => {
  dataObj.id = utils.objectId();
  STUDENTS.push(dataObj);
  return findData("id", dataObj.id);
};

const deleteData = (id) => {
  return findData("id", id).then((student) => {
    if (student.id == id) {
      STUDENTS = STUDENTS.filter((student) => student.id != id);
      return { id: id };
    }
    return null;
  });
};

const dropAll = () => {
  STUDENTS = [];
  return STUDENTS;
};

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  deleteData,
  dropAll,
};
```

</details>

---

#### MongoDB controllers:

Note for our MongoDB controllers implementation we depend on the database from the inner layer. The database includes MongoDB specific implementation of the model and database connection.

We write a dropAll function for the purposes of writing a test spec that can be used across any database choice. E.g. beforeEach test we would drop the database and seed items for testing.

<details>
  <summary>Sample Code</summary>

```js
const Student = require("../../../databases/mongodb/models/student");
const serialize = require("./serializer"); // switch custom

const listData = () => {
  return Student.find({}).then(serialize);
};

const findData = (prop, val) => {
  if (prop === "id") prop = "_id";
  return Student.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

const findDataBy = (params) => {
  return Student.find(params).then(serialize);
};

const addData = (dataObj) => {
  return Student.create(dataObj).then(serialize);
};

const updateData = (id, dataObj) => {
  return Student.findByIdAndUpdate(id, dataObj).then(serialize);
};

const deleteData = (id) => {
  return Student.findByIdAndDelete(id).then(serialize);
};

const dropAll = () => {
  return Student.remove();
};

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
};
```

</details>

---

### Src

Finally we write our src whose only dependency is our controllers layer. The src should not communicate directly with the model or database.

Any changes to the inner layer will cascade up and as a result there should be less testing done on the outer layers. E.g. if we were to test changes to the model schema in the driver layer we would need to rewrite our tests here as well.
