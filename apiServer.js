var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//for cart session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req,res)=>{
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// })

//APIs
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

//--->>>>SETUP SESSIONS<<<------//

app.use(session({
    secret: "heello",
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge: 1000*60*60*24*2}, //2 days in miliseconds
    store: new MongoStore({mongooseConnection: db, ttl: 2*24*60*60})
}))

//save to session

app.post('/cart', (req,res)=>{
    var cart = req.body;
    req.session.cart = cart;
    req.session.save((err)=>{
        if(err) throw err;
        res.json(req.session.cart)

    })
})

//get session cart api
app.get('/cart', (req,res)=>{
    if(typeof req.session.cart !== "undefined"){
        res.json(req.session.cart);
    }
})

//-----POST BOOKS <<<<----
var Books = require('./models/books');
app.post('/books', (req,res)=>{
  var book = req.body;

  Books.create(book, (err, books)=>{
    if(err){
      throw err;
    }
    res.json(books);
  })
})

// ----->>>GET Books<<<----//
app.get('/books', (req,res)=>{
  Books.find((err, book)=>{
    if(err){
      return res.status(422).send(err);
    }
    res.json(book)
  })
})


//--->>DELETE BOOKS <<<----//

app.delete('/books/:_id', (req,res)=>{
  const query = { _id: req.params._id};
  Books.remove(query, (err,book)=>{
    if(err){
      throw err;
    }
    res.send("Successfully deleted");
  })
})


//------>>>Update Books<<<-----//

app.put('/books/:_id',(req,res)=>{
  var book = req.body;

  var query = req.params._id;
  //if the field doesn't exist $set will set a new field

  var update = {
    '$set' : {
      title: book.title,
      description: book.description,
      images: book.images,
      price: book.price
    }
  };
  //when true returns the updated document

  var options = {new: true}

  Books.findOneAndUpdate(query, update, options, (err,books)=>{
    if(err){
      throw err;
    }
    res.json(books)
  })

})

//End APIs


//--->>Get BOOKS Images<<<----//
app.get('/images', function(req,res){
    const imgFolder = __dirname + '/public/images/';
    //required files in the directory
    const fs = require('fs')
    fs.readdir(imgFolder, function(err, files){
        if(err){
            return console.log(err);
        }
        const filesArr = [];
        files.forEach(function(file){
            filesArr.push({name: file})
        });
        res.json(filesArr)

    }
    
    )

})

const PORT = process.env.PORT || 3001

app.listen(PORT, function(err){
    if(err){
        return console.log(err)
    }
    console.log(`App is running on port ${PORT}`);
})