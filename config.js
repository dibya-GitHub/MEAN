module.exports = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/splitbill",
  LISTEN_PORT: process.env.LISTEN_PORT || 3000,
  DIBYA_SECRET: "randomString",
};
