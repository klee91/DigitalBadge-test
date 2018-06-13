const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const BadgeSchema = require('./BadgeSchema');
// http://d.lanrentuku.com/down/png/1610/16young-avatar-collection/boy-4.png

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
    },
    gender: {
        type: 'String',
        minlength: 1,
        maxlength: 1 
    },
    homeroom: {
        type: String,
        maxlength: 3
    },
    badges: [mongoose.Schema.Types.Mixed],
    profilePicture: {
        type: String,
        default: 'https://vanloeseosteopati.dk/wp-content/uploads/2017/11/girl-1.png'
    }
});

let Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.comparePassword = function(loginPassword, hash, callback){
	bcrypt.compareSync(loginPassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}