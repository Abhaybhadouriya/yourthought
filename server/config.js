require("dotenv").config({ path: `.env.local` });

const allConfig = {
  port: 5000,
  environment: process.env.NODE_ENV,
  client_url: process.env.CLIENT_BASE_URL,
  server_url: process.env.SERVER_BASE_URL,

  sendgrid: process.env.SENDGRID_KEY,


  cookie_secret: process.env.COOKIE_SECRET,

  // Databse config
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  printSequelizeLogs: true,
  dbConnectionPoolMax: 100,

  setTimeout: 60 * 60 * 1000, // 1 hour
  timeout: 60 * 60 * 1000, // 1 hour
  keepAliveTimeout: 5000,
  headersTimeout: 60 * 1000, // 1 minute
};

module.exports = allConfig;
