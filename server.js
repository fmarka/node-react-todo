// Load packages
import express from "express"
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';

// Create Express application
var app = express();

// Use the body-parser package in application
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Load routes
import routes from './routes/routes';
// Register Routes with /
app.use('/', routes);

// Start the server
app.listen(process.env.PORT || 3000, function() {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;