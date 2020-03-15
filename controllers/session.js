const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcryptjs = require('bcryptjs');

router.get('/new', (req, res) => {
    res.render('session/new.ejs');
});

router.post('/', (req, res) => {
      User.findOne({username:req.body.username}, (error,foundUser) => {
          if(foundUser === null){
        res.redirect('/session/new');
    } else {
        const doesPasswordMatch = bcryptjs.compareSync(req.body.password, foundUser.password);
        if(doesPasswordMatch){
            res.redirect('/wines');
        } else {
            res.redirect('/session/new');
        }
    }
  });
});

module.exports = router;
