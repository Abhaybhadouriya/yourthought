const models = require("../database/models");
const { Op } = require("sequelize");
// const { log } = require("../utils/log");
const firebase = require("../firebase");
const { v4: uuidv4 } = require("uuid");

module.exports.updateDocument = async (req, res) => {
  try {
    const { title, content, userId,tags } = req.body;


    return res.status(200).json({
      status: 200,
      message: "Updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please try again",
    });
  }
};

module.exports.saveDocument = async (req, res) => {
  try {
    const { title, content, userId,tags } = req.body;
    const docId = uuidv4()
    const fs = firebase.firestore();

    fs.collection('documents').doc(docId).set({
      title:title,
      name:name,
      date:date,
      tag:tag,
      content:content
    })

    return res.status(200).json({
      status: 200,
      message: "Saved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please try again",
    });
  }
};

module.exports.deleteDocument = async (req, res) => {
  try {
    
    return res.status(200).json({
      status: 200,
      message: "Delete successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please try again",
    });
  }
};

module.exports.viewDocument = async (req, res) => {
    try {
      
      return res.status(200).json({
        status: 200,
        message: "Document Fetched Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };

  module.exports.viewDocumentList = async (req, res) => {
    try {
      
      return res.status(200).json({
        status: 200,
        message: "Document List Fetched successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };
  module.exports.filterList = async (req, res) => {
    try {
      
      return res.status(200).json({
        status: 200,
        message: "Filtered List Fetched successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };

  module.exports.publishDocument = async (req, res) => {
    try {
      
      return res.status(200).json({
        status: 200,
        message: "Document Published successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };

  module.exports.unpublishDocument = async (req, res) => {
    try {
      
      return res.status(200).json({
        status: 200,
        message: "Document Published successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };