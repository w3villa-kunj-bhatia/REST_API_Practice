const mongoose = require("mongoose");

async function connectMongoDB(url) {
return mongoose.connect(url);
}

module.exports = { connectMongoDB };

// MongoDB Connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/nodetutorial")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error(err));