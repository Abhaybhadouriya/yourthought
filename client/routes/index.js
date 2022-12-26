const likes = require("./likes");
const user = require("./user");
const comment = require("./comment");
const documents = require("./document");
const followFunction = require("./followFunction")

module.exports = (app) => {
  app.use("/api/likes", likes);
  app.use("/api/user", user);
  app.use("/api/comment", comment);
  app.use("/api/documents", documents);
  app.use("/api/followFunction",followFunction);

  app.get("/", (req, res) => {
    res.statusCode = 200;
    res.send(">>> Welcome to Project.");
  }); 

  app.use("*", (req, res) => {
    res.statusCode = 404; 
    res.send("Not found");
  });
};
  