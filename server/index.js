const ON_DEATH = require("death");



const app = require("./app");
const config = require("./config");
const { sequelize } = require("./database/models");
const { clearRunningQueries } = require("./migrationManager");

const exitWithError = (error) => {
  console.error(error);
  process.exit(1);
};

const verifyDBConnection = async () => {
  try {
    await sequelize.authenticate();
  } catch (connectionError) {
    exitWithError("Error connecting to DB:", connectionError);
  }
};

const connectToDBAndRunMigrations = async () => {
  await verifyDBConnection();
  // await clearDatabase();
  // await clearRunningQueries();
};


const startApp = async () => {
    await connectToDBAndRunMigrations();
  
    const PORT = config.port || 5000;
  
    const server = app.listen(PORT, () => {
      console.log("Server is running on port", server.address().port);
    });
  
    server.setTimeout(config.setTimeout, () => {
      console.debug(`Server socket timeout hit`);
    });
    server.timeout = config.timeout;
    server.keepAliveTimeout = config.keepAliveTimeout;
    server.headersTimeout = config.headersTimeout;

    await require("./firebase");


    ON_DEATH((signal, error) => {
      console.info("Shutting down db and express app...", signal, error);
      server.close();
    });
  };
  
  startApp();