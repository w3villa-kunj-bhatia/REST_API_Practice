const express = require("express");

const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middleware");

const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/nodetutorial");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
