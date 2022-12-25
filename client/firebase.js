const admin = require("firebase-admin");
const firebaseConfig = require("./firebaseConfig");
require("dotenv").config({ path: `.env.local` });

// const db = firebase.initializeApp(config.config);
// module.exports= db;
// const { initializeApp } = require('firebase-admin/app');
// const firebaseApp = initializeApp(firebaseConfig.config);
// module.exports =  firebaseApp

const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    type:process.env.TYPE,
project_id:process.env.PROJECT_ID ,
private_key_id:process.env.PRIVATE_KEY_ID,
private_key:process.env.PRIVATE_KEY,
client_email:process.env.CLIENT_EMAIL,
client_id:process.env.CLIENT_ID,
auth_uri:process.env.AUTH_URI,
token_uri:process.env.TOKEN_URI,
auth_provider_x509_cert_url:process.env.AUTH_PROVIDER_X509_CERT_URL,
client_x509_cert_url:process.env.CLIENT_X509_CERT_URL
  })
});

module.exports = firebase;