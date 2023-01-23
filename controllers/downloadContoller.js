const path = require("path"),
  fs = require("fs"),
  message = require("../message");
const CONFIG = require("../config");

const file_Controllers = {
  onDownload: async function (req, res, next) {
    let file_name = req.params.file;
    console.log(file_name);
    const filePath = CONFIG.UPLOAD_DIRECTORY.concat("/",file_name);
    // verification de l'existence du fichier
    fs.exists(filePath, function (exists) {
      if (exists) {
        //response header
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=" + file_name,
        });
        fs.createReadStream(filePath).pipe(res);
        return;
      }
      res.status(400).writeHead({ "Content-Type": "text/plain" });
      res.send({
        error: true,
        message: message.download_error,
      });
    });
  },
  OnStream: async function (req, res) {
    const range = req.headers.range;
    let file_name = req.params.file;
    if (!range) {
       res.status(400).send("header not found");
    }

    const VideoPath = path.join(CONFIG.UPLOAD_DIRECTORY.concat("/",file_name));

    const videoSize = fs.statSync(VideoPath).size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // creation headers
    const contentLenght = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Lenght": contentLenght,
      "Content-Type": "Video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(VideoPath, { start, end });

    // stream
    videoStream.pipe(res);
  },
};

module.exports = file_Controllers;
