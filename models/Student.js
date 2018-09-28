var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    birthday: {
        type: String
    },
    location: {
        type: String
    }
});

var Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
