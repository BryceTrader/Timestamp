// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date?", (req, res) => {
	const date_string = req.params.date
	const result = {
		unix: null,
		utc: null
	}


	let date = +date_string ? new Date(+date_string) : new Date(date_string)
	if(typeof date_string == 'undefined') {
		date = new Date()
	}

	result.unix = date.getTime()
	result.utc = date.toUTCString()
	if(isValidDate(date)) {
		res.json(result)
	} else {
		res.json({ error: 'Invalid Date' })
	}
})

function isValidDate(date) {
	return date instanceof Date && !isNaN(date)
}