const CONFIG = require("../config");

const uuid = require("uuid").v4,
  path = require("path"),
  message = require("../message"),
  fs = require("fs");

const UPLOAD_FILE = {
  onUpload: async function (req, res) {
    console.log(req.files);
    try {
      if (!req.files) {
        res.status(401).send({
          error: true,
          message: message.file_missing,
        });
      } else {
        /*traitement de l'upload fichier*/
        let dir = CONFIG.UPLOAD_DIRECTORY;
        let upload_file = req.files.file;
        let verify = new Promise(async (resolve, reject) => {
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            resolve(fs);
          } else {
            resolve(fs);
          }
        })
          .then(async (fs) => {
            let filePath = uuid() + upload_file.name;
            await upload_file.mv(dir.concat("/", filePath));
            res.status(200).send({
              message: message.upload_succes,
              name: filePath,
              mimetype: upload_file.mimetype,
              size: upload_file.size,
              url: message.download_url + filePath,
            });
          })
          .catch((fs) => {
            return res.status(500).send({
              error: true,
              message: message.upload_error,
            });
          });
      }
    } catch (err) {
      return res.status(415).send({
        error: true,
        message: message.upload_failed,
      });
    }
  },
  onRemoveFile: async function (req, res) {
    let file_name = req.params.file;
    let file_source = CONFIG.UPLOAD_DIRECTORY.concat("/",file_name);
    if (fs.existsSync(file_source)) {
      fs.unlinkSync(file_source);
      return res
        .status(201)
        .json({ message: file_name + " " + message.remove_file });
    }
    return res.json({ message: message.file_error });
  },
};
module.exports = UPLOAD_FILE;
