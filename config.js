const CONFIG = {
  VERSION: 1,
  BUILD: 1,
  PROD: false,
  URL: "http://127.0.0.1",
  UPLOAD_DIRECTORY:"./uploads",
  API_PATH: "/api",
  PORT: process.env.PORT || 3001,
  GET_URL: function () {
    return this.URL + ":" + this.PORT + this.API_PATH + "/";
  },
};

module.exports = CONFIG;
