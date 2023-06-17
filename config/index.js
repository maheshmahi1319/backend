const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT || 8001,
  DB_URL: process.env.MONGODB_URI || 'mongodb+srv://kasaudhanmahesh021:XGbbCv2a6LjVattd@cluster0.i26yvhp.mongodb.net/?retryWrites=true&w=majority',
  APP_SECRET: process.env.APP_SECRET || 'alcor'
};
