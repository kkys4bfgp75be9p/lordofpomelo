var express = require('express');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config/admin');

var app = express();

//--------------------configure app----------------------
var pub = __dirname + '/public';
var view = __dirname + '/views';

app.use(compression());

app.use(logger(':method :url :response-time ms'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
app.set('views', view);
app.engine('.html', require('ejs').__express);

app.on('error', function(err) {
	console.error('app on error:' + err.stack);
});

app.get('/', function(req, resp) {
	resp.render('index', config);
});



app.get('/module/:mname', function(req, resp) {
	resp.render(req.params.mname);
});

app.listen(7001);
console.log('[AdminConsoleStart] visit http://0.0.0.0:7001');