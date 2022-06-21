const express = require('express');
const router = express.Router();

// Private routes are not accessible by non athenticated users
// you need to have a token to havee access to them unlike Public routes

// @route    GET api/auth
// @desc     test route
// @access   Public
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;