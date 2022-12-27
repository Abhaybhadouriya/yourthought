const models = require("../database/models");
const { Op } = require("sequelize");
// const { log } = require("../utils/log");

module.exports.likes= async (req, res) => {
  try {

    const {userId,docId} = req.query
    
    const data = {
      docId:docId,
      userId:userId,
    
    }
    const document = await models.Likes.findOne({
      where:data
    })
    if(document){

      await models.Likes.destroy({
        where:data
      })

      const totLikes = await models.Likes.count({
        where:{
          docId:docId,
        }
      })
      return res.status(200).json({
        totLikes: totLikes,
        docId:docId,
        message: "Post is DisLiked",
      });
    }
    await models.Likes.create(data)
    const totLikes = await models.Likes.count({
      where:{
        docId:docId,
      }
    })
    return res.status(200).json({
      status: 200,
      totLikes:totLikes,
      message: "You Liked a Post",
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

      const {docId} =  req.query;

      const totLikes =  await models.Likes.count({
        where:{docId}
      })
      return res.status(200).json({
        status: 200,
        totLikes:totLikes,
        message: "success",
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
      const {userId} = req.query;
      const dataJson = await models.Likes.findAll({
        where:{
          userId:userId
        },
        include:[{
          model:models.Document,
          required: false,
          attributes: ['title', 'tags','createdAt']
        }],
        attributes: ['createdAt',"docId"]
       
      })
      return res.status(200).json({
        data:dataJson,
        status: 200,
        message: "success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };
  