const models = require("../database/models");
const { Op } = require("sequelize");
const firebase = require("../firebase");
const mainSender = require("../utils/mailSender")

module.exports.registerUser = async (req, res) => {
  try {
    const { password, email, name } = req.query;
    // console.log(password,email,name)
      firebase.auth()
      .createUser({
        email: email,
        emailVerified: false,
        password: password,
        displayName: name,
        disabled: false,
      })
      .then((data) => {
        firebase.auth()
          .generateEmailVerificationLink(email)
          .then((link) => {
            var mailOptions = {
              from: 'admin@gurujikenotes.tech',
              to: email,
              subject: 'Email verification',
              text: `Hello ${name}, 

              Follow this link to verify your email address.
              
              ${link}
              
              If you didn’t ask to verify this address, you can ignore this email.
              
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
                const userDetails = {
                  id: data.uid,
                  email: data.email,
                  name: data.displayName,
                  status: "inactive",
                  verified: data.emailVerified
                };

                models.User.create(userDetails);
                // console.log('Email sent: ' + info.response);
              }
            });
            return res
              .status(201)
              .json({ message: `Hi ${data.displayName} registration is successful and Verification mail is sent on your registered mail, Please Verify Your Email, `, uid: data.uid, name: data.displayName, email: data.email });
          })
          .catch((error) => {
            firebase.auth().deleteUser(data.uid);
            return res.status(500).json({
              status: 500,
              message: "Email not send. Please try again",
            });
          });



      })
      .catch((err) => {
     
        return res.status(500).json({
          status: 500,
          message:err.errorInfo.message,
          erorr:err.errorInfo
        });
      });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please try again",
    });
  }
};
module.exports.getUser = async (req, res) => {
  try {
    const { uid} = req.query;

    firebase.auth()
    .getUser(uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      return res.status(200).json({
        data:userRecord.toJSON(),
        status: 200,
        message: "Fetched",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        err:error,
        status: 500,
        message: "Something went wrong",
      });
    });
   
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please try again",
    });
  }
};
module.exports.userBanByAdmin = async (req, res) => {
  try {
    return res.status(200).json({
      status: 200,
      message: "User is Banned",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please try again",
    });
  }
};
