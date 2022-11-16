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
      status: true,
    };
    const bill = {
      name: "bill",
      age: 18,
      grade: 11,
      status: false,
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
      status: false,
    };
    const actualObj = {
      images: [],
      status: false,
      name: "felix",
      grade: 10,
      age: 16,
    };
    expect(inputOjb).to.eql(actualObj);
  });
});
