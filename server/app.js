var express = require('express');
var app = express();
var config = require('./config');

config(app);
app.get('/api/user', function (req, res) {
	var IP = req.ip;
	res.json({ ip: IP });
});
