const express = require('express');
const router = express.Router();

// Private routes are not accessible by non athenticated users
// you need to have a token to havee access to them unlike Public routes

// @route    GET api/posts
// @desc     test route
// @access   Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;