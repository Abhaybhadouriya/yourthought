const express = require("express");
const router = express.Router();
const controller = require("../controller/document");

router.post("/saveDocument", (req, res) => {
    controller.saveDocument(req, res);
});
  router.get("/deleteDocument", (req, res) => {
    controller.deleteDocument(req, res);
  });
  router.post("/updateDocument", (req, res) => {
    controller.updateDocument(req, res);
  });
  router.get("/viewDocument", (req, res) => {
    controller.viewDocument(req, res);
  });
  router.get("/viewDocumentListUser", (req, res) => {
    controller.viewDocumentListUser(req, res);
  });
  router.get("/filterList", (req, res) => {
    controller.filterList(req, res);
  });
  router.get("/publishDocument", (req, res) => {
    controller.publishDocument(req, res);
  });
  router.get("/unpublishDocument",(req,res) =>{
    controller.unpublishDocument(req,res);
  })
  


module.exports = router;
