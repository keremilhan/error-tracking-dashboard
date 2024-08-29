const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateUserName,
  updateEmail,
  updatePassword,
} = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user/name").post(updateUserName, updateEmail);
router.route("/user/email").post(updateEmail);
router.route("/user/password").post(updatePassword);

module.exports = router;
