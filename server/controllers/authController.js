const { StatusCodes } = require("http-status-codes");
const {
  registerUser,
  loginUser,
  changeName,
  changeEmail,
  changePassword,
} = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await registerUser(userData);
    res
      .status(StatusCodes.CREATED)
      .json({ user, message: "You have successfully registered" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(StatusCodes.OK).json({ user, message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

const updateUserName = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const userName = await changeName(email, name);
    res
      .status(StatusCodes.OK)
      .json({ userName, message: "Username changed successful" });
  } catch (error) {
    next(error);
  }
};

const updateEmail = async (req, res, next) => {
  try {
    const { email, newEmail } = req.body;
    const userEmail = await changeEmail(email, newEmail);
    res
      .status(StatusCodes.OK)
      .json({ userEmail, message: "Email changed successful" });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;
    const userPassword = await changePassword(email, password, newPassword);
    res.status(StatusCodes.OK).json({ message: "Password changed successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  updateUserName,
  updateEmail,
  updatePassword,
};
