var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

var users = require('./user');

app.use('/users', users);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(8080);
console.log("App running on port 8080");
