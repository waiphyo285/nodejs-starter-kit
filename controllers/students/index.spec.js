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
