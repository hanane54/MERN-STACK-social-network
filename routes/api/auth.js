const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");

const User = require("../../models/User");

// Private routes are not accessible by non athenticated users
// you need to have a token to havee access to them unlike Public routes

// @route    GET api/auth
// @desc     test route
// @access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/auth
// @desc     Authenticate user and get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if the user already exists
      let user = await User.findOne({ email });
      if (!user) {
        res
          .status(400)
          .json({
            errors: [{ msg: "Invalid Credentials!" }],
          });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch){
        res
          .status(400)
          .json({
            errors: [{ msg: "Invalid Credentials!" }],
          });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // Return the jsonwebtoken
      // res.send("User Register");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
