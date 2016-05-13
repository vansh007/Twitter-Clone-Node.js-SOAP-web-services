var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , flash = require('connect-flash')
  , session = require('express-session')
  , cookie = require('cookie-parser');
  
var app = express();
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
	  secret: 'TW',
	  resave: true,   
	  saveUninitialized: true, 
	  duration: 30 * 60 * 1000,     
	  activeDuration: 5 * 60 * 1000,
	  store: new mongoStore({
			url: configDB.url
		})  
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
var twRoute = require('./routes/twitterRoute.js');
new twRoute(app, passport);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
