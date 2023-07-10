const express = require("express");
const multer = require("multer");
const path = require("path");

//file upload location
const Uploads_Folder = "./uploads/";

//define storage
const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, Uploads_Folder);
  },
  filename: (req, file, cb) => {
    //File Name.pdf //file-name-342446554.pdf
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});

//prepare the final multer upload objecct
const upload = multer({
  //dest: Uploads_Folder,
  storage: store,
  limits: {
    fileSize: 2000000, //2MB
  },
  fileFilter: (req, file, cb) => {
    //console.log(file);
    if (file.fieldname === "single") {
      cb(null, true);
    } else if (file.fieldname === "multi") {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "application/pdf"
      ) {
        cb(null, true);
      } else {
        //cb(null, false);    //there will be no error message//silently file upload denied
        cb(new Error("Only jpg, png or pdf file accepted!"));
      }
    } else if (file.fieldname === "photos") {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        //cb(null, false);    //there will be no error message//silently file upload denied
        cb(new Error("Only jpg, png or jpeg file accepted!"));
      }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
});

const app = express();

//application route
//single file upload
app.post("/single", upload.single("single"), (req, res) => {
  console.log(req.file);
  res.send("Single File Uploaded.");
});

//multi file upload
app.post("/multi", upload.array("multi", 3), (req, res) => {
  console.log(req.file);
  res.send("Multiple File Uploaded.");
});
//multiple files with multiple fields upload
app.post(
  "/photos",
  upload.fields([
    { name: "single" },
    { name: "multi", maxCount: 2 },
    { name: "photos", maxCount: 5 },
  ]),
  (req, res) => {
    console.log(req.files);
    res.send("Multiple Files with Multiple Fields Uploaded.");
  }
);

//Upload form-data without any file only text or others
app.post("/text", upload.none(), (req, res) => {
  res.send("No File will be Uploaded. Only text field will be uploaded.");
});

//default error handler
app.use((err, req, res, next) => {
  if (err.message) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was upload error.");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.status(200).send("Success.");
  }
});

app.listen(3000, () => {
  console.log("Connected to port 3000");
});
