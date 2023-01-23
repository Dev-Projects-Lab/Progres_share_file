const config = require("./config");

const Message = {
  /*Message response*/
  upload_succes: "upload file successfully",
  upload_error: "on error during upload file",
  file_missing:"no upload files",
  upload_failed: "failed to upload file",
  remove_file: "file deleted",
  file_error: "file not found",
  download_error: "Error reading file",
  download_url: config.GET_URL() + "download/",
};

module.exports = Message;
