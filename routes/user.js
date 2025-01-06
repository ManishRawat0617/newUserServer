const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authentication");
const {
  handleGetAllUser,
  handleUpdateUser,
  handleRegisterUser,
  handleRegisterUserWithGoogle,
  handleLoginUser,
  handleDeleteUser,
  handleGetUserByRole,
  handleGetUserById,
} = require("../controller/userController");

// Get the list of all users
router.get("/", handleGetAllUser);

// Get all the role stored by the user
router.get("/roles", handleGetUserByRole);

// Registering the user
router.post("/register", handleRegisterUser);

// Registering the user with google
router.post("/registerWithGoogle", handleRegisterUserWithGoogle);

// login the user
router.post("/login", handleLoginUser);

// update user
router.patch("/update", handleUpdateUser);

// delete the user
router.delete("/delete", verifyToken, handleDeleteUser);

//get user profile
router.get("/profile", handleGetUserById);

module.exports = router;
