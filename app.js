const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const likeRouter = require('./routes/likes');

const mongoose = require("mongoose");

const connetMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/social', { useNewUrlParser: true });
    console.log('connect successful ! ');
  } catch (error) {
    console.error('connect MongoDb has error: ' + error);
  }
};

connetMongoDB();

const app = express();
app.use(cookieParser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/login', loginRouter);
app.use('/likes', likeRouter);

app.get('/hihi', function (req, res) {
  res.cookie("firtsCookie", "look bad");
  console.log('Cookies: ', req.cookies)
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// var publicDir = require('path').join(__dirname);
// app.use(express.static(publicDir));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
