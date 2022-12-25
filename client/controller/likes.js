const models = require("../database/models");
const { Op } = require("sequelize");
// const { log } = require("../utils/log");

module.exports.likes= async (req, res) => {
  try {
    return res.status(200).json({
      status: 200,
      message: "Post is liked successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please try again",
    });
  }
};


module.exports.unlike = async (req, res) => {
    try {
      return res.status(200).json({
        status: 200,
        message: "Post is Unliked successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };

  
module.exports.viewLikePost = async (req, res) => {
    try {
      return res.status(200).json({
        status: 200,
        message: "Post Likes Fetched",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };

  
module.exports.viewLikeInProfile = async (req, res) => {
    try {
      return res.status(200).json({
        status: 200,
        message: "User Liked Post",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };
  