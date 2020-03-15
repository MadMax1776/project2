const express = require('express');
const router = express.Router();
const Wine = require('../models/wine.js');


router.get('/seed', (req, res) => {
  Wine.create(
    [
            {
                name:'Max',
                color:'white',
                country:'Chile'
            },
            {
                name:'Casillero Del Diablo',
                color:'red',
                country:'Chile'
            },
            {
                name:'Kindzmarauli',
                color:'red',
                country:'Republic of Georgia'
            }
        ],
        (err, data) => {
          res.redirect('/wines');
        }
  )
});




router.get('/new', (req, res) => {
  res.render('new.ejs');
});

router.post('/', (req, res)=>{
  Wine.create(req.body, (error, createdWine) => {
      res.redirect('/wines')
  });
});

router.get('/', (req, res) => {
  Wine.find({}, (error, allWines) => {
    res.render('index.ejs', {
      wines: allWines
    });
  });
});

router.get('/:id', (req, res) => {
  Wine.findById(req.params.id, (err, foundWine) => {
    res.render('show.ejs', {
      wine: foundWine
    });
  });
});

router.delete('/:id', (req, res)=>{
    Wine.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/wines');
    });
});

router.get('/:id/edit', (req, res) => {
  Wine.findById(req.params.id, (err, foundWine) => { //find the wine
    res.render(
      'edit.ejs',
      {
        wine: foundWine ////insert found wine
      }
    );
  });
});

router.put('/:id', (req, res) => {
  Wine.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateModel) => {
    res.redirect('/wines');
  });
});





module.exports = router;
