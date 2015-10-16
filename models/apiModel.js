/**
 * Created by disco on 10/15/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
    text: String,
    completed: Boolean
});

var ToDo = mongoose.model('toDo',toDoSchema);

module.exports = ToDo;
