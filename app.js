var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var app = express();

mongoose.connect('mongodb://dev_user:ssalahacks@ds056688.mlab.com:56688/devdb_nineteenp');

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var users = require('./user');
var sales = require('./sale');

app.use('/auth', users);
app.use('/api/sales', sales);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(8080);
console.log("App running on port 8080");
