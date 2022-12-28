const models = require("../database/models");
const { Op } = require("sequelize");
// const { log } = require("../utils/log");
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../database/models");

module.exports.doFollow= async (req, res) => {
  try { 
    const {followerId,followedById} = req.query;
    const data = {
        followedById:followedById,
        followerId:followerId,
    } 
    console.log(data)
    const doc = await models.follows.findOne({
      where:{followerId,followedById}, 
      attributes: ["id"]
    })

    if(doc){
        await models.follows.destroy({
            where:data
        })
        const totFollower =  await models.follows.count({
          where :{followerId}
        })
        return res.status(200).json({
          totFollower:totFollower,
            status: 200,
            message: "User is Unfollowed",
        });
    }
 
    await models.follows.create({
      followerId,followedById
     })

     const totFollower =  await models.follows.count({
      where :{followerId}
    })
   
    return res.status(200).json({
      totFollower:totFollower,
      status: 200,
      message: "followed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please try again",
    });
  } 
};
 

module.exports.viewFollowers = async (req, res) => {
    try {
      const {followerId} = req.query
      const query = "SELECT * FROM `u883350542_Yourthought`.`follows` LEFT JOIN `u883350542_Yourthought`.`Users` ON `u883350542_Yourthought`.`follows`.`followedById` = `u883350542_Yourthought`.`Users`.`id` WHERE `followerId` = '"+followerId+"'";
      // const data =  await models.follows.findAll({
      //   where:{followerId},
      //   include:[{
      //     model:models.User,
      //     required: false,
      //     attributes: ['name'],
      //     where:{followedById:models.User.id},
      //   }],
      //   attributes: ['createdAt',"followedById"]
      // })
      
      const data = await sequelize.query(query , {
        type: QueryTypes.SELECT
          })
            return res.status(200).json({
        data:data,
        message: "Follower List Fetched",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };

  module.exports.viewFollowed = async (req, res) => {
    try {
      const {followedById} = req.query
      const query = "SELECT * FROM `u883350542_Yourthought`.`follows` LEFT JOIN `u883350542_Yourthought`.`Users` ON `u883350542_Yourthought`.`follows`.`followerId` = `u883350542_Yourthought`.`Users`.`id` WHERE `followedById`='"+followedById+"'"
     
      const data = await sequelize.query(query , {
        type: QueryTypes.SELECT
          })
          
      return res.status(200).json({
        data:data,
        message: "Follower List Fetched",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };

  
module.exports.viewFollowCount = async (req, res) => {
    try {
      
  
      const {followerId} = req.query

      const totFollower =  await models.follows.count({
        where :{followerId}
      })
      return res.status(200).json({
        data:totFollower,
        message: "Follower List Fetched",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };

  
module.exports.notifyFollowers = async (req, res) => {
    try {


      return res.status(200).json({
        message: "Notifed",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please try again",
      });
    }
  };
  