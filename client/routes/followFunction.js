const express = require("express");
const router = express.Router();
const controller = require("../controller/followFunction");

router.get("/doFollow", (req, res) => { 
    controller.doFollow(req, res);
});
router.get("/viewFollowed", (req, res) => { 
  controller.viewFollowed(req, res);
});
  router.get("/viewFollowers", (req, res) => {
    controller.viewFollowers(req, res);
  });
  router.get("/viewFollowCount", (req, res) => {
    controller.viewFollowCount(req, res);
  });
  router.get("/notifyFollowers", (req, res) => {
    controller.notifyFollowers(req, res);
  });
  
  
module.exports = router;
