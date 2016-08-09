
var Validator = require('../libs/validator');
var Todo = require('../models/todo');

module.exports = function( app, router ) {

	
	// Initial Route
	router.get('/', function(req, res) {

		res.sendFile('/public/index.html');

	});


	// Get Todos' List
	router.get('/list', function(req, res) {

		Todo.find(function(err, todos ) {
    		if (err)
      			res.send(err);
    		res.json(todos);
  		});

	});


	// Edit Todos' Item
	router.post('/edit/:id', function(req, res) {

		// Validate Form
		var ret = Validator.validate( req, ["title", "text"] );

		// Errors in Form
		if( ret.err ){
			res.json({ err:true, errors: ret.errors });
			return;
		}

		// Use the Todos' Model to find a specific item
		Todo.findById(req.params.id, function(err, todoItem) {
		
			if(err)
		    	res.send(err);

		    // Update Item
		    todoItem.title = ret.values.title;
		    todoItem.text = ret.values.text;

		    // Save Item and check for errors
		    todoItem.save(function(err) {
				if (err)
		        	res.send(err);
				res.json({ item: todoItem } );
		    });

		});

	});


	// Add Todos' item
	router.post('/add', function(req, res) {

		// Validate Form
		var ret = Validator.validate( req, ["title", "text"] );

		// Errors in Form
		if( ret.err ){
			res.json({ err:true, errors: ret.errors });
			return;
		}

		// Save Todo Item
		var todoItem = new Todo();
  		todoItem.title = ret.values.title;
  		todoItem.text = ret.values.text;

		todoItem.save(function(err) {
    		if (err){
    			err.err = true;
      			res.send(err);
      		}
		    res.json({ item: todoItem, message: "Todo Item saved" });
		});

	});


	// Delete Todo Item
	router.post('/delete/:id', function(req, res) {

		Todo.findByIdAndRemove(req.params.id, function(err) {
    		if (err){
    			err.err = true;
      			res.send(err);
      			return;
      		}
			res.json({ err:false, message: 'Todo item deleted' });
  		});

	});


    // Register Routes with /
	app.use('/', router);

};