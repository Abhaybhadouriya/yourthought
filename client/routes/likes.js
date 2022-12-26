const express = require("express");
const router = express.Router();
const controller = require("../controller/likes");

router.get("/likes", (req, res) => {
    controller.likes(req, res);
});

  router.get("/viewLikePost", (req, res) => {
    controller.viewLikePost(req, res);
  });
  router.get("/viewLikeInProfile", (req, res) => {
    controller.viewLikeInProfile(req, res);
  });

module.exports = router;
