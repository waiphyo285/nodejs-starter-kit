const single = (dataObj) => {
    let showObj = {
        level: "Undefined"
    };

    if (dataObj.levelid) {
        showObj = {
            level: dataObj.levelid.level
        }
    }

    // prevent key
    const returnObj = {
        ...dataObj,
        ...showObj
    };

    return returnObj;
};

const serializer = (data) => {
    if (!data) {
        return null;
    }
    else if (Array.isArray(data)) {
        return { data: data.map(single) };
    }
    else {
        return { data: single(data) };
    }
};

module.exports = serializer;
