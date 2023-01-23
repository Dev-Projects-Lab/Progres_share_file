/**
 * @autor Rafalimanana jean sebastien
 */
var express = require("express");
const router = express.Router();
const uploadControllers = require("../controllers/uploadController");

// route pour user
const uploadFile = (app) => {
  router.route("/upload").post(uploadControllers.onUpload);
  router.route("/upload/delete/:file").delete(uploadControllers.onRemoveFile);
  return router;
};

module.exports = uploadFile;
