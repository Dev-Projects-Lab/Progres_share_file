/**
 * @autor Rafalimanana jean sebastien
 */
var express = require("express");
const router = express.Router();
const fileControllers = require("../controllers/downloadContoller");

const fileRoute = (app) => {
  router.route("/download/:file").get(fileControllers.onDownload);
  router.route("/stream-file/:file").get(fileControllers.OnStream);

  return router;
};

module.exports = fileRoute;