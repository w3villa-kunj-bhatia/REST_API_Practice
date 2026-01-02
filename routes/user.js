const express = require("express");
const router = express.Router();

// Import the functions we just created in the controller
const {
  handleGetAllUsers,
  handleGetAllUsersHTML,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

// Route for /users (HTML view)
router.get("/html", handleGetAllUsersHTML);

// Routes for /users (API view)
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

// Routes for /users/:id
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById) // Task asked for PATCH
  .delete(handleDeleteUserById);

module.exports = router;
