const express = require('express');
const router = express.Router();


router.get("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  const users = await User.find({});
  res.setHeader("X-MyName", "Kunj");
  return res.status(200).json(users);
});

// Get, Update, Delete user by ID
router
  .route("/:id")
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
router.post("/", async (req, res) => {
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

module.exports = router;