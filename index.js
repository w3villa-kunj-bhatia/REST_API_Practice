const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()} ${req.ip} ${req.method} ${req.path}\n`,
    () => next()
  );
});

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/nodetutorial")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, required: true, unique: true },
    jobTitle: String,
    gender: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Routes

// HTML Response
app.get("/users", async (req, res) => {
  const users = await User.find({});
  const html = `
    <ul>
      ${users
        .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
        .join("")}
    </ul>
  `;
  res.send(html);
});

// Get all users (API)
app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  res.setHeader("X-MyName", "Kunj");
  return res.status(200).json(users);
});

// Get, Update, Delete user by ID
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  })
  .put(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(204).send();
  });

// Create user
app.post("/api/users", async (req, res) => {
  const { firstName, lastName, email, jobTitle, gender } = req.body;

  if (!firstName || !email) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    jobTitle,
    gender,
  });

  return res.status(201).json(user);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
