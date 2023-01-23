var express = require('express');
var fileUpload = require('express-fileupload');
var body = require('body-parser');
var cors = require('cors');
var upload_file = require('./routes/uploadRoute');
var download_file = require('./routes/downloadRoute');
   


const app = new express();
app.use(body.json());
app.use(cors({origin: '*'}));
app.use(fileUpload({createParentPath:true}));

app.use("/api", upload_file());
app.use("/api",download_file())

module.exports = app;
