var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');

var index = require('./routes/index');
var data = require('./routes/data');
var user = require('./controllers/user.js');

var app = express();
var done=false;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('what3213the#%^$fuck'));
app.use(session({
    secret: '3e%4@#$T342r92hg24$#t',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 100000
    }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/data', data);

app.use(multer({ dest: './public/uploads/',
 rename: function (fieldname, filename) {
    return user.loginmail;
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

app.post('/photoUpload',function(req,res){
  if(done==true){
    res.redirect("http://localhost:3001"); // CHANGE     IT     INTO     SEVER     ADDRESS
  }
});


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.listen(3001);

module.exports = app;
