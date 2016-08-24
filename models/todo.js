// Load packages
import mongoose from 'mongoose';

// Connect to the MongoDB
mongoose.connect('mongodb://mongodb_user:mongodb_password@ds145295.mlab.com:45295/node_todos',
  function(err, res) {
    if (err) {
      //console.log('Error connecting to the database' + err);
    } else {
      //console.log('Connected to Mongo database!');
    }
  });

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Todo', {
  title: String,
  text: String,
  completed: Boolean
});