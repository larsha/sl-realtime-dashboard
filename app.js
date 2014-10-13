// app.js

// call the packages we need
var config = require('./config.json'),
	express = require('express'),
	fs = require('fs'),
	http = require('http'),
	app = express();

var router = express.Router(); // get an instance of the express Router

app.set('view engine', 'hbs');

// get is a simple wrapper for request()
// which sets the http method to GET
var url = config.api.url +
	'?key=' + config.api.key +
	'&siteId=' + config.api.siteId +
	'&timeWindow=' + config.api.timeWindow;

app.get('/', function(req, res) {
	var request = http.get(url, function (response) {
		var buffer = "",
			data;

		// data is streamed in chunks from the server
		// so we have to handle the "data" event
		response.on("data", function (chunk) {
			buffer += chunk;
		});

		// When all data is received, parse and send to template
		response.on("end", function (err) {
			// finished transferring data
			// dump the raw data
			data = JSON.parse(buffer).ResponseData;

			res.render('index', {
				data: data.Metros
			});
		});
	});
});

app.listen(4000);