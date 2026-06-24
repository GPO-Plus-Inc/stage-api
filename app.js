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
const recurringJobRoutes = require("./routes/recurringJobRoutes");
const templateRoutes = require("./routes/templateRoutes");
const jobTemplateRoutes = require("./routes/jobTemplateRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const planogramRoutes = require("./routes/planogramRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const assetRoutes = require("./routes/assetRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const inventoryLocationRoutes = require("./routes/inventoryLocationRoutes");

var app = express();
const corsOptions = {
  origin: ['http://localhost:3000',"https://stage.prismplus.ai","https://prismplus.ai"], // Explicitly allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
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
app.use("/v1",recurringJobRoutes);
app.use("/v1",templateRoutes);
app.use("/v1",jobTemplateRoutes);
app.use("/v1",inventoryRoutes);
app.use("/v1",planogramRoutes);
app.use("/v1",equipmentRoutes);
app.use("/v1",assetRoutes);
app.use("/v1",serviceRoutes);
app.use("/v1",inventoryLocationRoutes);


// mongoose.connect('mongodb://127.0.0.1:27017/prismplusservice').then(()=>{
//   console.log("Database connected !!")
// });



mongoose.connect("mongodb://appuser:Falcon-Matrix-Comet-73%21Nova-Titan-Vortex-48@127.0.0.1:27017/prismplusservice?authSource=prismplusservice")
// mongoose.connect('mongodb://127.0.0.1:27017/prismplusservice')
.then(() => {
  console.log("Database connected !!");
})
.catch((err) => {
  console.error("MongoDB Error:", err);
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
