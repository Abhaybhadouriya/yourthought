const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const allConfig = require("./config");
// const validateUser = require("./middleware/validateUser");
const { sequelize } = require("./database/models");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.set("trust proxy", true);

app.use(
  cors({
    origin: [allConfig.client_url],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));

app.use(
  session({
    secret: allConfig.cookie_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600 * 24 * 1000, // 1 day
      sameSite: "Lax",
      secure: true,
      httpOnly: true,
    },
    name: "session",
    store: new SequelizeStore({
      db: sequelize,
      table: "SessionToken",
    }),
  })
);

// app.use(validateUser);

require("./routes")(app);
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send(">>> Welcome to Project.");
}); 

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end("Internal server error. Please try again later.");
});

module.exports = app;