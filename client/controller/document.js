const models = require("../database/models");
const { Op } = require("sequelize");
// const { log } = require("../utils/log");
const firebase = require("../firebase");
const { v4: uuidv4 } = require("uuid");

module.exports.updateDocument = async (req, res) => {
  try {
    const { title, content, userId, tags, name, docId } = req.body;
    const fs = firebase.firestore();

    fs.collection('documents').doc(docId).set({
      title: title,
      name: name,
      userId: userId,
      tag: tags,
      content: content
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
  try {
    const { title, content, userId, tags, name, date } = req.body;
    const docId = uuidv4()
    const fs = firebase.firestore();

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
    return res.status(201).json({
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
    const { docId } = req.body;
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
    const { docId } = req.body;
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

    const { userId } = req.body;
    const docRef = firebase.firestore().collection('documents')
    const snapshot = await docRef.where('userId', '==', userId).get();
    if (snapshot.empty) {
      return res.status(404).json({
        status: 404,
        message: "No such document!",
      });
    }

    // snapshot.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data());
    // });

    return res.status(200).json({
      data: snapshot,
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
    const { query } = req.body
    documents = await models.Document.findAll({
      where: {
        published:1,
        [Op.or]: [{ title: { [Op.like]: `%${query}%` } },
        { tags: { [Op.like]: `%${query}%` } }]
      },
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
    const { docId } = req.body;
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
    const { docId } = req.body;
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