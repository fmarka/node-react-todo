
// Load packages
var express = require('express');
var bodyParser = require('body-parser');

// Create Express application
var app = express();

// Use the body-parser package in application
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static('public'));

// Create Express router
var router = express.Router();

// Load routes
require("./routes/routes")( app, router );

// Start the server
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env );
});