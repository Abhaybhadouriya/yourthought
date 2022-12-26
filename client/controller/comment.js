const models = require("../database/models");
const { Op } = require("sequelize");
// const { log } = require("../utils/log");

module.exports.comment= async (req, res) => {
  try {
    const {docId,userId,commentText} = req.body;
    await models.Comment.create({
      docId:docId,
      userId:userId,
      commentText:commentText
    })

    const data = await models.Comment.findAll({
      where:{
        docId:docId
      }
    })

    return res.status(200).json({
      data:data,
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
      const {docId,userId,id} = req.body;

      await models.Comment.destroy({
        where:{
          docId:docId,
          userId:userId,
          id:id
        }
      })

      const data = await models.Comment.findAll({
        where:{
          docId:docId
        }
      })
  

      return res.status(200).json({
        data:data,
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
      const {docId,userId,id} = req.body;
      const data = await models.Comment.findAll({
        where:{
          docId:docId
        }
      })
  
      return res.status(200).json({
        data:data,
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
      const {docId,userId,id} = req.body;
      const data = await models.Comment.findAll({
        where:{
          userId:userId
        },
        include:[{
          model:models.Document,
          required: false,
          attributes: ['title', 'tags','createdAt']
        }],
        attributes: ["commentText"]
      })
  
      return res.status(200).json({
        data:data,
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
  