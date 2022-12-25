const express = require("express");
const router = express.Router();
const controller = require("../controller/likes");

router.get("/likes", (req, res) => {
    controller.likes(req, res);
  res.send("likes");
});
router.get("/unlike", (req, res) => {
    controller.unlike(req, res);
    res.send("unlike");
  });
  router.get("/viewLikePost", (req, res) => {
    controller.viewLikePost(req, res);
    res.send("View Like Post");
  });
  router.get("/viewLikeInProfile", (req, res) => {
    controller.viewLikeInProfile(req, res);
    res.send("View in profile");
  });

module.exports = router;
