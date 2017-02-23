var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    courseCode: {
        type: String,
        required: true,
        unique: true
    },
    courseName: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Course', courseSchema);