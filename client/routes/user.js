const express = require("express");
const router = express.Router();
const controller = require("../controller/user");

router.get("/loginUser", (req, res) => {
    controller.loginUser(req, res);
});
router.post("/registerUser", (req, res) => {
      controller.registerUser(req, res);
  });
router.get("/forgotPassword", (req, res) => {
      controller.forgotPassword(req, res);
  });
router.get("/userBanByAdmin", (req, res) => {
      controller.userBanByAdmin(req, res);
  });

module.exports = router;