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
    await studentsDb.addData(input);
    inputOjb = {
      ...input,
      images: [],
      prefect: false,
    };
    const actualObj = {
      images: [],
      prefect: false,
      name: "felix",
      grade: 10,
      age: 16,
    };
    expect(inputOjb).to.eql(actualObj);
  });
});
