
// Load packages
var mongoose = require('mongoose');

// Connect to the MongoDB
mongoose.connect('mongodb://mongodb_user:mongodb_password@ds145295.mlab.com:45295/node_todos');

module.exports = mongoose.model('Todo', { title: String, text: String });