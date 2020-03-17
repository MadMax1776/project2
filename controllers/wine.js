const express = require('express');
const router = express.Router();
const Wine = require('../models/wine.js');

//// you have to do wines/seed in order to seed data
router.get('/seed', (req, res) => {
  Wine.create(
    [
            {
                name:'Max',
                color:'white',
                country:'Chile',
                year: 2015,
                qty: 100,
                img: '/imgs/maxWine.jpg',
                // https://www.flickr.com/photos/186673375@N04/49667200517/in/dateposted-public/
                price: '$20.00',
                alcoholContent: '13.5%',
                description: 'With granitic soils and a sandy loam texture, the 19.3 hectare vineyard is the winery’s symbol. Classic Bordeaux varieties, such as Cabernet Sauvignon, Merlot and Petit Verdot, in addition to Malbec and Syrah are grown here. It is also the place of origin of our renowned wines Don Maximiano Founder’s Reserve and La Cumbre Syrah.'
            },
            {
                name:'Casillero Del Diablo',
                color:'red',
                country:'Chile',
                year: 2010,
                qty: 40,
                img: '/imgs/diablo.jpg',
                price: '$18.00',
                alcoholContent: '14%',
                description: 'Outstanding in the Super Premium segment, Casillero del Diablo Reserva Privada shows all its elegance and sophistication in its three superior-quality varieties.'
            },
            {
                name:'Khvanchkara',
                color:'red',
                country:'Republic of Georgia',
                year: 2010,
                qty: 40,
                img: '/imgs/StalinWine.jpg',
                price: '$100.00',
                alcoholContent: '11.5%',
                description: `One would imagine that marketing anything as it being 'Stalin's favorite' would be the kiss of death for that product, but apparently not so for this Georgian semi-sweet wine Khvanchkara. `

            }
        ],
        (err, data) => {
          res.redirect('/wines');
        }
  )
});




router.get('/new', (req, res) => {
  res.render('wines/new.ejs');
});

router.post('/', (req, res)=>{
  Wine.create(req.body, (error, createdWine) => {
      res.redirect('/wines')
  });
});

router.get('/', (req, res) => {
  Wine.find({}, (error, allWines) => {
    res.render('wines/index.ejs', {
      wines: allWines
    });
  });
});

router.get('/:id', (req, res) => {
  Wine.findById(req.params.id, (err, foundWine) => {
    res.render('wines/show.ejs', {
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
      'wines/edit.ejs',
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
