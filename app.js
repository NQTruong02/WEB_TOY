var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//router (1)
var ToyRouter = require('./routes/Toy');
var LegoRouter = require('./routes/Lego');

var app = express();

//mongoose
var mongoose = require('mongoose');
var uri = "mongodb+srv://Truong2002:Truong2002@cluster0.y7zoaiw.mongodb.net/ASM1644ToyStore";
mongoose.connect(uri)
.then(() => { console.log ("connect to db succeed !")});

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//router (2)
app.use('/Toy', ToyRouter);
app.use('/Lego', LegoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//setup port for deployment
var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running at http://localhost:5000");
});
module.exports = app;