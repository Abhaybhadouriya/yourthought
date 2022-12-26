const express = require("express");
const router = express.Router();
const controller = require("../controller/comment");

router.post("/comment", (req, res) => {
    controller.comment(req, res);
});
router.get("/deleteCommnet", (req, res) => {
      controller.deleteCommnet(req, res);
  });
  router.get("/viewCommentOnPost", (req, res) => {
      controller.viewCommentOnPost(req, res);
  });
  router.get("/viewCommentOnProfile", (req, res) => {
      controller.viewCommentOnProfile(req, res);
  });

module.exports = router;
