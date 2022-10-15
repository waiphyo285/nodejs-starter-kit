let STUDENTS = require("../../../models/memory/students");
const utils = require("../../../helpers/utils");
const serialize = require("./serializer"); // switch custom

const listData = () => {
  return Promise.resolve(serialize(STUDENTS));
};

const findDataById = (id) => {
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
  return findDataById(dataObj.id);
};

const deleteData = (id) => {
  return findDataById(id)
    .then((student) => {
      if (student.id == id) {
        STUDENTS = STUDENTS.filter((student) => student.id != id);
        return serialize({ id: id });
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
  findDataById,
  findDataBy,
  addData,
  deleteData,
  dropAll,
};
