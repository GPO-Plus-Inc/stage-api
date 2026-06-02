var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roleRoutes = require('./routes/roleRoutes');
var authRoutes = require('./routes/authRoutes');
const permissionRoutes = require("./routes/permissionRoutes");
const zohoRoutes = require("./routes/zohoRoutes");
const qboRoutes = require("./routes/qboRoutes");
const accountRoutes = require("./routes/accountRoutes");
const serviceLocationRoutes = require("./routes/serviceLocationRoutes");
const jobRoutes = require("./routes/jobRoutes");

var app = express();
const corsOptions = {
  origin: ['http://localhost:3000'], // Explicitly allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you use cookies or authorization headers
};

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', indexRouter); 
app.use('/v1', roleRoutes);
app.use('/v1', authRoutes);
app.use("/v1",permissionRoutes);
app.use("/v1",zohoRoutes);
app.use("/v1",qboRoutes);
app.use("/v1",accountRoutes);
app.use("/v1",serviceLocationRoutes);
app.use("/v1",jobRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/prismplusservice').then(()=>{
  console.log("Database connected !!")
});

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

module.exports = app;
