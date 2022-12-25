const express = require("express");
const router = express.Router();
const controller = require("../controller/comment");

router.get("/comment", (req, res) => {
    controller.comment(req, res);
  res.send("Do comment");
});
router.get("/deleteCommnet", (req, res) => {
      controller.deleteCommnet(req, res);
    res.send("Delete Comment");
  });
  router.get("/viewCommentOnPost", (req, res) => {
      controller.viewCommentOnPost(req, res);
    res.send("view commnet on post");
  });
  router.get("/viewCommentOnProfile", (req, res) => {
      controller.viewCommentOnProfile(req, res);
    res.send("View Profile Comments");
  });

module.exports = router;
