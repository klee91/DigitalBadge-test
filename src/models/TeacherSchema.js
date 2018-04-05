let mongoose = require('mongoose');

let TeacherSchema = mongoose.Schema ({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    homeroom: {
        type: String,
    },
    subjects: {
        type: Array, 
        required: true
    },
    age: {
        type: Number, 
        required: true
    }
});

let Teacher = module.exports = mongoose.model('Teacher', TeacherSchema);