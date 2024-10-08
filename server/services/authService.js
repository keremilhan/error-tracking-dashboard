const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

/**
 * Registers a new user with the provided user data.
 *
 * Creates a new user record in the database and generates a JWT token for authentication.
 *
 * @param {Object} userData - The user data object containing email, password, and name.
 * @returns {Promise<Object>} A promise that resolves to an object containing user email, name, and accessToken.
 * @throws {BadRequestError} If user data is not provided.
 */
const registerUser = async (userData) => {
  if (!userData) {
    throw new BadRequestError("User data is required");
  }
  const user = await User.create({ ...userData });
  const token = user.createJWT();
  return { email: user.email, name: user.name, accessToken: token };
};

/**
 * Authenticates a user based on the provided email and password.
 *
 * Verifies the email and password against the stored user data in the database.
 * If authentication is successful, generates a JWT token for authentication.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves to an object containing user email, name, and accessToken.
 * @throws {BadRequestError} If email or password is not provided.
 * @throws {UnauthenticatedError} If no user is found with the provided email or if password is incorrect.
 */
const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials: password");
  }

  const token = user.createJWT();
  return { email: user.email, name: user.name, accessToken: token };
};

const findUserByEmail = async (email) => {
  if (!email) {
    throw new BadRequestError("Please provide email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  return user;
};

const changeName = async (email, name) => {
  if (!email || !name) {
    throw new BadRequestError("Please provide email and name");
  }

  const user = await findUserByEmail(email);

  user.name = name;

  await user.save();

  return user.name;
};

const changeEmail = async (email, newEmail) => {
  if (!email || !newEmail) {
    throw new BadRequestError("Please provide email");
  }

  const user = await findUserByEmail(email);

  user.email = newEmail;

  await user.save();

  return user.email;
};

const changePassword = async (email, password, newPassword) => {
  if (!password || !newPassword) {
    throw new BadRequestError("Please provide password");
  }

  const user = await findUserByEmail(email);

  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials: password");
  }

  user.password = newPassword;

  await user.save();
};

module.exports = {
  registerUser,
  loginUser,
  findUserByEmail,
  changeName,
  changeEmail,
  changePassword,
};
