const User = require("../models/userModel.js");
const { createTokenForUser } = require("../middleware/authentication.js");

// template for send response
function handleResponse(res, status, message, data = null) {
  return res.status(status).json({
    status,
    message,
    data,
  });
}

// will get all the user from the database
async function handleGetAllUser(req, res, next) {
  try {
    const allUser = await User.find();
    handleResponse(res, 200, "All user are fetched !!!", allUser);
  } catch (error) {
    next(error);
  }
}

// registering the user
async function handleRegisterUser(req, res, next) {
  try {
    const { email, password, name, phoneNumber, role } = req.body;

    if (!email || !password || !name) {
      handleResponse(res, 404, "Fill all the field");
    }
    // checking if the email already exists
    if (await User.findOne({ email })) {
      handleResponse(res, 404, "Email already exists");
    }

    // Creating a new user
    const newUser = await User.create({
      name,
      email,
      password,
      phoneNumber,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      // roles: savedRole,
    });
    next();
  } catch (error) {}
}

// registering the user
async function handleRegisterUserWithGoogle(req, res, next) {
  try {
    const { email, name, phoneNumber } = req.body;

    if (!email || !name) {
      handleResponse(res, 404, "Fill all the field");
    }
    // checking if the email already exists
    if (await User.findOne({ email })) {
      handleResponse(res, 404, "Email already exists");
    }

    // Creating a new user
    const newUser = await User.create({
      name,
      email,

      phoneNumber,
    });

    return res.status(201).json({
      message: "User registered successfully",
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      // roles: savedRole,
    });
    next();
  } catch (error) {}
}

// login user
async function handleLoginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        message: "Please fill all the field ",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email is not found" });
    }

    if (user.password != password) {
      return res.status(200).json({
        message: "Password is incorrect !!",
      });
    }
    const token = createTokenForUser(user);
    return res.status(200).json({
      id: user.id,
      // name: user.name,
      // email: user.email,
      userName: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// update  user details
async function handleUpdateUser(req, res, next) {
  try {
    const { email, name, phone, role } = req.body;
    const { id } = req.query;
    // Find user by Id and update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, name, phone },
      { new: true }
    );

    if (!updatedUser) {
      handleResponse(res, 404, "User not found !!!");
    }

    // send success response
    handleResponse(res, 200, "User updated successfully", (data = updatedUser));
  } catch (error) {
    next(error);
  }
}

// delete user
async function handleDeleteUser(req, res, next) {
  try {
    const { id } = req.query;
    const deletedUser = await User.findByIdAndDelete(id);
    handleResponse(res, 200, "Users deleted successfully !!", deletedUser);
  } catch (error) {
    next(error);
  }
}

// filter user by role
async function handleGetUserByRole(req, res, next) {
  try {
    const userByRole = await User.find({}, "role");
    handleResponse(res, 200, "Fetched User by roles", userByRole);
  } catch (err) {
    next(err);
  }
}

// get user by id
async function handleGetUserById(req, res, next) {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) {
      handleResponse(res, 404, "User not found !!!");
    }
    handleResponse(res, 200, "User found !!!", user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleGetAllUser,
  handleUpdateUser,
  handleRegisterUser,
  handleLoginUser,
  handleDeleteUser,
  handleGetUserByRole,
  handleGetUserById,
  handleRegisterUserWithGoogle,
};
