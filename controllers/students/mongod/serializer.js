const single = (dataObj) => {
  // prevent key
  return dataObj;
};

const serializer = (data) => {
  if (!data) {
    return null;
  }
  else if (Array.isArray(data)) {
    return data.map(single);
  }
  else {
    return single(data);
  }
};

module.exports = serializer;
