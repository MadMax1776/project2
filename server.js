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
app.use(express.urlencoded({extended:false}));
////===================================================

const wines = require('./models/wine.js');

app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'
app.use((req, res, next) => {
  // console.log('I run for all routes');
  next();
})



app.get('/wines/new', (req, res) => {
  res.render('new.ejs');
});


app.get('/wines/', (req, res) => {
    res.render('index.ejs',
  {
    allWines: wines
  });
});

app.get('/wines/:indexOfWinesArray', (req, res) => {
  res.render('show.ejs', {
    wines: wines[req.params.indexOfWinesArray]
  });
});

app.post('/wines', (req, res) => {
  wines.push(req.body)
  res.redirect('/wines'); //sends user back to /wines
});










////==================================================
app.get('/', (req, res) => {
  res.send('your application is working');
});






app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
