const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/users.js');

router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

// router.post('/', (req, res) => {
//     res.send(req.body);
// });

router.post('/', (req, res) => {
    req.body.password = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(10));
    // res.send(req.body);
    ////did the res.send to test, strange there's no id or v:0
    User.create(req.body, (error, createdUser) => {
      res.redirect('/wines');
  });
});

module.exports = router;
