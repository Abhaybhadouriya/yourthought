const models = require("../database/models");
const { Op } = require("sequelize");
// const { log } = require("../utils/log");

module.exports.comment= async (req, res) => {
  try {
    return res.status(200).json({
      status: 200,
      message: "Comment Posted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please try again",
    });
  }
};


module.exports.deleteCommnet = async (req, res) => {
    try {
      return res.status(200).json({
        status: 200,
        message: "Comment Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };

  
module.exports.viewCommentOnPost = async (req, res) => {
    try {
      return res.status(200).json({
        status: 200,
        message: "Comments Fetched",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };

  
module.exports.viewCommentOnProfile = async (req, res) => {
    try {
      return res.status(200).json({
        status: 200,
        message: "User Comments List Fetched Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };
  