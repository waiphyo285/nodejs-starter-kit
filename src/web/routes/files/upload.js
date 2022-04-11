const fs = require("fs");
const path = require("path");
const multer = require("multer");
const helpers = require("./helpers");
const config = require("../../../../config/index");
const {
  status,
  createResponse,
} = require("../../../../helpers/handle_response");

const upload = (module.exports = {});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var saveDir = req.params.folderName || "data";
    var ifExistDir = "./public/uploads/" + saveDir;

    if (!fs.existsSync(ifExistDir)) {
      fs.mkdirSync(ifExistDir, {
        recursive: true,
      });
    }
    cb(null, ifExistDir);
  },

  // By default, multer removes file extensions so const's add them back
  filename: function (req, file, cb) {
    const prefix = config.APP.FILE + "-" + Date.now();
    const filename = prefix + path.extname(file.originalname);
    console.log(`File ${filename} is uploaded`);
    cb(null, filename);
  },
});

upload.index = (req, res, next) => {
  // 'uploaded_file' is the name of our file input field in the HTML form
  const uploadWithMulter = multer({
    storage: storage,
    fileFilter: helpers.imageFilter,
  }).single("uploaded_file");

  uploadWithMulter(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.status(status[400].code).json(
        createResponse("FAIL", {
          data: { message: req.fileValidationError },
        })
      );
    } else if (!req.file) {
      return res.status(status[400].code).json(
        createResponse("FAIL", {
          data: { message: "Please select an image to upload" },
        })
      );
    } else if (err instanceof multer.MulterError) {
      return res.status(status[400].code).json(
        createResponse("FAIL", {
          data: { message: err },
        })
      );
    } else if (err) {
      return res.status(status[400].code).json(
        createResponse("FAIL", {
          data: { message: err },
        })
      );
    }

    // Display uploaded image for user validation
    res.status(status[200].code).json(
      createResponse("SUCCESS", {
        data: {
          message: "Successful upload file",
          data: req.file,
        },
      })
    );
  });
};

upload.multiUpload = (req, res, next) => {
  // 10 is the limit I've defined for number of uploaded files at once
  // 'uploaded_files' is the name of our file input field
  const uploadWithMulter = multer({
    storage: storage,
    fileFilter: helpers.imageFilter,
  }).array("uploaded_files", 10);

  uploadWithMulter(req, res, function (err) {
    if (req.fileValidationError) {
      return res.status(status[400].code).json(
        createResponse("FAIL", {
          data: { message: req.fileValidationError },
        })
      );
    } else if (!req.files) {
      return res.status(status[400].code).json(
        createResponse("FAIL", {
          data: { message: "Please select images to upload" },
        })
      );
    } else if (err instanceof multer.MulterError) {
      return res.status(status[400].code).json(
        createResponse("FAIL", {
          data: { message: err },
        })
      );
    } else if (err) {
      return res.status(status[400].code).json(
        createResponse("FAIL", {
          data: { message: err },
        })
      );
    }

    // Display uploaded image for user validation
    res.status(status[200].code).json(
      createResponse("SUCCESS", {
        data: {
          message: "Successful upload file",
          data: req.files,
        },
      })
    );
  });
};
