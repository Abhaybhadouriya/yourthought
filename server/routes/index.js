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
 
  app.get("/api", (req, res) => {
    res.statusCode = 200;
    res.send(`<table>
    <tr><th>Request</th><th>USER</th></tr>
    <tr><td>post</td><td><a href="#">/api/user/registerUser</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/user/userBanByAdmin</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/user/getUser</a></td></tr>
    <tr><th>Request</th><th>LIKES</th></tr>
    <tr><td>get</td><td><a href="#">/api/likes/viewLikePost</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/likes/viewLikeInProfile</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/likes/likes</a></td></tr>
    <tr><th>Request</th><th>Comment</th></tr>
    <tr><td>post</td><td><a href="#">/api/comment/comment</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/comment/deleteCommnet</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/comment/viewCommentOnPost</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/comment/viewCommentOnProfile</a></td></tr>
    <tr><th>Request</th><th>Document</th></tr>
    <tr><td>post</td><td><a href="#">/api/documents/saveDocument</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/documents/deleteDocument</a></td></tr>
    <tr><td>post</td><td><a href="#">/api/documents/updateDocument</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/documents/viewDocumentListUser</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/documents/viewDocument</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/documents/filterList</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/documents/publishDocument</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/documents/unpublishDocument</a></td></tr>
    <tr><th>Request</th><th>Follow</th></tr>
    <tr><td>get</td><td><a href="#">/api/followFunction/doFollow</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/followFunction/viewFollowed</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/followFunction/viewFollowers</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/followFunction/viewFollowCount</a></td></tr>
    <tr><td>get</td><td><a href="#">/api/followFunction/notifyFollowers</a></td></tr>
    </table>`);
  }); 
  app.get("/", (req, res) => {
    res.statusCode = 200;
    res.send(`Hello....... <tr><td>post</td><td><a href="#">/api/user/registerUser</a></td></tr>.......... Guest`);
  }); 

  app.use("*", (req, res) => {
    res.statusCode = 404; 
    res.send("Not found g");
  });
};
  