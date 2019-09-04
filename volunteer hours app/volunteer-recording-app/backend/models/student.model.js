const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    school: {
        type: String,
        required: true,
        trim: true
    },
    club: {
        type: String,
        trim: true
    },
},
    {
        timestamps: true

    });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;