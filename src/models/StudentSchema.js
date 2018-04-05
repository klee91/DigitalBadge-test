let mongoose = require('mongoose');

// let StudentModel = mongoose.model('Student', {
//     firstName: String,
//     lastName: String,
//     age: Number,
//     grade: String
// });
// let userDataSchema = new Schema ({
//     firstName: {type: String, required: true},
//     lastName: String,
//     age: Number,

// }, {collection: 'user-data');

let StudentSchema = mongoose.Schema ({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    age: {
        type: Number, 
        required: true
    },
    grade: {
        type: String, 
        required: true
    }

});

let Student = module.exports = mongoose.model('Student', StudentSchema);
