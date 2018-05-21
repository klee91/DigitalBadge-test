const mongoose = require('mongoose');

let StudentSchema = mongoose.Schema ({
    firstName: {
        type: String,
        minlength: 1,
        maxlength: 20,
        required: [true, 'This field is required.' ]
    },
    lastName: {
        type: String, 
        minlength: 1,
        maxlength: 20,
        required: [true, 'This field is required.' ]
    },
    password: {
        type: String,
        // validate: {
        //     validator: function(v) {
        //         let regex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
        //         // regex validates for:
        //         // 1. at least 6 characters long
        //         // 2. must contain at least 1 lowercase and 1 uppercase character
        //         // 3. must contain at least 1 number
        //         // 4. must contain at least 1 special character
        //         return regex.test(v);
        //     }
        // },
        required: [true, 'This field is required.' ] 
    },
    email: {
        type: String,
        // validate: {
        //     validator: function(v) {
        //         let regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/;
        //         // regex validates for:
        //         // 1. email address
        //         return regex.test(v);
        //     }
        // },
        required: [true, 'This field is required.' ]
    }
});



let Student = module.exports = mongoose.model('Student', StudentSchema);
