const models = require("../database/models");
const { Op } = require("sequelize");
// const { log } = require("../utils/log");
const firebase = require("../firebase");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../database/models");
const { QueryTypes } = require('sequelize');
const mainSender = require("../utils/mailSender")

module.exports.updateDocument = async (req, res) => {
  try {
    const { title, content, userId, tags, name, docId } = req.query.e;
    const fs = firebase.firestore();

    fs.collection('documents').doc(docId).set({
      title: title,
      name: name,
      userId: userId,
      tag: tags,
      content: content
    })
    await models.Document.update({title:title,tags:tags},{
      where:{id:docId}
    })
    return res.status(201).json({
      message: "Blog is Updated Successfully",
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

  const notify = (email,title,name,doc,auth) =>{
    var mailOptions = {
      from: 'admin@gurujikenotes.tech',
      to: email,
      subject: `New Post - ${title}`,
      text: `Hello ${name}, 

      ${auth} is uplaoded new Post please cheack it out.
      
      https://youthought.abhaybhadouriya.tech/blogs/${doc}
      
      Thanks,
      
      YourThought team`
    };
    mainSender.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({
          status: 500,
          message: "Email not send. Please try again",
        });
      } else {
      console.log('Email sent: ' + info.response);
        };

       
      }
    );
  }


  try {
    const { title, content, userId, tags, name} = req.query.e;
    // const { title, content, userId, tags, name} = req.body;
    const docId = uuidv4()
    const fs = firebase.firestore();
    // console.log(userId);
    // console.log(userId);
        
    fs.collection('documents').doc(docId).set({
      title: title,
      name: name,
      userId: userId,
      tag: tags,
      content: content
    })
    const documentData = {
      id: docId,
      userId: userId,
      title: title,
      tags: tags
    }
    

    models.Document.create(documentData)
    
    const query = "SELECT * FROM `u883350542_Yourthought`.`follows` LEFT JOIN `u883350542_Yourthought`.`Users` ON `u883350542_Yourthought`.`follows`.`followedById` = `u883350542_Yourthought`.`Users`.`id` WHERE `followerId` = '"+userId+"'";
    const users = await sequelize.query(query , {
      type: QueryTypes.SELECT
        })

    users.forEach(element => {
      notify(element.email,title,element.name,docId,name)
    });
    return res.status(201).json({
      data :users,
          message: "Blog is Successfully saved",
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
    const { docId } = req.query;
    firebase.firestore().collection('documents').doc(docId).delete()
    const document = await models.Document.findOne({
      where: {
        id: docId
      },
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    await models.Document.destroy({
      where: {
        id: docId
      },
    });
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
   const { docId } = req.query

    const docRef = firebase.firestore().collection('documents').doc(docId)
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        status: 404,
        message: "No such document!",
      });
    } else {

      return res.status(200).json({
        status: 200,
        doc: doc.data(),
        message: "Document Fetched Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please try again",
    });
  }
};

module.exports.viewDocumentListUser = async (req, res) => {
  try {

    const { userId } = req.query;
    const dataJson = await models.Document.findAll({
      where:{
        userId:userId
      },
      
      attributes: ['id',"published","title","createdAt","tags","userId"]
     
    })

    // snapshot.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data());
    // });

    return res.status(200).json({
      data: dataJson,
      status: 200,
      message: "Document List Fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please try again",
    });
  }
};
module.exports.filterList = async (req, res) => {
  try {
    const { query } = req.query
    
    const documents = await models.Document.findAll({
      where: {
        published:1,
        [Op.or]: [{ title: { [Op.like]: `%${query}%` } },
        { tags: { [Op.like]: `%${query}%` } }]
      },
	include:[{
          model:models.User,
          required: false,
          attributes: ['name']
        }],
    });

    return res.status(200).json({
      document: documents,
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
    const { docId } = req.query;
    await models.Document.update({published:1},{
      where:{id:docId}
    })
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
    const { docId } = req.query;
    await models.Document.update({published:0},{
      where:{id:docId}
    })
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