import Express from "express"
import React from 'react';
import ReactDom from 'react-dom/server';
import Validator from '../libs/validator';
import TodoApp from '../components/TodoApp';
import Todo from '../models/todo';

var router = Express.Router();

// Initial Route
router.get('/', function(req, res) {

	Todo.find(function(err, todoItems) {
		if (err)
			res.send(err);

		var markup = ReactDom.renderToString(
			React.createElement(TodoApp, {
				items: todoItems
			})
		);

		res.render('home', {
			markup: markup, // Pass rendered react markup
			state: JSON.stringify(todoItems) // Pass current state to client side
		});

	});

});

// Add Todos' item
router.post('/add', function(req, res) {

	// Validate Form
	var ret = Validator.validate(req, ["title", "text"]);

	// Errors in Form
	if (ret.err) {
		res.json({
			err: true,
			errors: ret.errors
		});
		return;
	}

	// Save Todo Item
	var todoItem = new Todo();
	todoItem.title = ret.values.title;
	todoItem.text = ret.values.text;
	todoItem.completed = false;

	todoItem.save(function(err) {

		if (err) {
			err.err = true;
			res.send(err);
		}

		res.json({
			item: todoItem,
			message: "Todo Item saved"
		});

	});

});


// Edit Todos' Item
router.post('/edit/:id', function(req, res) {

	// Validate Form
	var ret = Validator.validate(req, ["title", "text"]);

	// Errors in Form
	if (ret.err) {
		res.json({
			err: true,
			errors: ret.errors
		});
		return;
	}

	// Use the Todos' Model to find a specific item
	Todo.findById(req.params.id, function(err, todoItem) {
		if (err)
			res.send(err);

		// Update Item
		todoItem.title = ret.values.title;
		todoItem.text = ret.values.text;

		// Save Item and check for errors
		todoItem.save(function(err) {
			if (err)
				res.send(err);
			res.json({
				item: todoItem
			});
		});
	});
});


// Delete Todo Item
router.post('/delete/:id', function(req, res) {

	Todo.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			err.err = true;
			res.send(err);
			return;
		}
		res.json({
			err: false,
			message: 'Todo item deleted'
		});
	});

});


// Update Item Property
router.post('/update_property/:id/:property/:value', function(req, res) {

	var id = req.params.id,
		property = req.params.property,
		value = req.params.value;

	if (property == "completed")
		value = (value === 'true');

	// Find a specific Todos' item 
	Todo.findById(req.params.id, function(err, todoItem) {

		if (err)
			res.send(err);

		// Update Item
		todoItem[property] = value;

		// Save Item and check for errors
		todoItem.save(function(err) {
			if (err)
				res.send(err);
			res.json({
				item: todoItem
			});
		});
	});
});

export default router;