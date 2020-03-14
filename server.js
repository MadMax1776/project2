const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const session = require('express-session');
const db = mongoose.connection;
const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};


// Connect to Mongo
mongoose.connect(process.env.DATABASE_URL, dbupdateobject);
// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected! ', process.env.DATABASE_URL));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open', () => {
    console.log('Connection made!');
});
//////==========================================================
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
////===================================================
////================CRUD========================================
const Wine = require('./models/wine.js');

app.get('/wines/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/wines/', (req, res)=>{
  Wine.create(req.body, (error, createdWine) => {
      res.redirect('/wines')
  });
});

app.get('/wines', (req, res) => {
  Wine.find({}, (error, allWines) => {
    res.render('index.ejs', {
      wines: allWines
    });
  });
});

app.get('/wines/:id', (req, res) => {
  Wine.findById(req.params.id, (err, foundWine) => {
    res.render('show.ejs', {
      wine: foundWine
    });
  });
});

/////============================================================
//
//
// app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'
// app.use((req, res, next) => {
//   // console.log('I run for all routes');
//   next();
// })
//
// app.get('/wines/new', (req, res) => {
//   res.render('new.ejs');
// });
//
// app.get('/wines/', (req, res) => {
//     res.render('index.ejs',
//   {
//     allWines: wines
//   });
// });
//
// app.get('/wines/:indexOfWinesArray', (req, res) => {
//   res.render('show.ejs', {
//     wines: wines[req.params.indexOfWinesArray]
//   });
// });
//
// app.post('/wines', (req, res) => {
//   wines.push(req.body)
//   res.redirect('/wines'); //sends user back to /wines
// });
//
// app.delete('/wines/:indexOfWinesArray', (req, res) => {
//   wines.splice(req.params.indexOfWinesArray, 1); //remove item from the array
//   res.redirect('/wines'); //redirect back to the index route
// })
//
// app.get('/wines/:indexOfWinesArray/edit', (req, res) => {
//   res.render(
//     'edit.ejs', // render views/edit.ejs
//     { //pass in an object that contains
//       wines: wines[req.params.indexOfWinesArray], //the wines object
//       index: req.params.indexOfWinesArray //the wine index in the array
//     }
//   );
// })
//
// app.put('/wines/:indexOfWinesArray', (req, res) => {
//   wines[req.params.indexOfWinesArray] = req.body; // find the index that is specified in the url (:indexOfFruitsArray).  Set that element to the value of req.body (the input data)
//   res.redirect('/wines');
// });


////================================================================
// app.get('/', (req, res) => {
//   res.send('your application is working');
// });






app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
