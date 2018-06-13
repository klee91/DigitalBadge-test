const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let TeacherSchema = mongoose.Schema ({
    firstName: {
        type: String, 
        required: [true, 'This field is required.' ]
    },
    lastName: {
        type: String, 
        required: [true, 'This field is required.' ]
    },
    email: {
        type: String,
        required: [true, 'This field is required.' ]
    },
    password: {
        type: String,
        validate: {
            validator: function(v) {
                const regex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
                let m;
                // regex validates for:
                // 1. at least 6 characters long
                // 2. must contain at least 1 lowercase and 1 uppercase character
                // 3. must contain at least 1 number
                // 4. must contain at least 1 special character
                if((m = regex.exec(v)) !== null) {
                    m.forEach((match, groupIndex) => {
                        console.log(`Found match, group ${groupIndex}: ${match}`);
                    });
                } 
            }
        },
        required: [true, 'This field is required.' ] 
    },
    homeroom: {
        type: String,
    },
    subjects: {
        type: Array
    },
    age: {
        type: Number
    }
});

let Teacher = module.exports = mongoose.model('Teacher', TeacherSchema);

module.exports.comparePassword = function(loginPassword, hash, callback){
	bcrypt.compareSync(loginPassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}