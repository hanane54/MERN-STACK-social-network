const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    // sortir du processus avec échec vu
    // que la connexion à la base de données n'a pas réussi
    process.exit(1);
  }
};

module.exports = connectDB;
