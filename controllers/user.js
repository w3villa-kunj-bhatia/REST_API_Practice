const User = require("../models/user");

// Function to handle GET /users (the HTML list)
async function handleGetAllUsersHTML(req, res) {
  const users = await User.find({});
  const html = `
    <ul>
      ${users
        .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
        .join("")}
    </ul>`;
  res.send(html);
}

// Function to handle GET /api/users (the JSON data)
async function handleGetAllUsers(req, res) {
  const users = await User.find({});
  res.setHeader("X-MyName", "Kunj"); // Custom Header
  return res.status(200).json(users);
}

// Function to handle GET /api/users/:id
async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json(user);
}

// Function to handle PATCH /api/users/:id (Updating)
async function handleUpdateUserById(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json(user);
}

// Function to handle DELETE /api/users/:id
async function handleDeleteUserById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(204).send();
}

// Function to handle POST /api/users (Creating)
async function handleCreateNewUser(req, res) {
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
}

module.exports = {
  handleGetAllUsers,
  handleGetAllUsersHTML,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
