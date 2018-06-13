const mongoose = require('mongoose');

let BadgeSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    // depending on the badge, will be categorized here for organization
    category: {
        type: String
    },
    // the value in points for the badge
    pointValue: {
        type: String
    },
    // how many of these badges are available to give out
    // ** functionality/association must be implemented where quantity increments/decrements
    // ** EXAMPLE CASE SCENARIO: badge is exclusive and only 5 students can have one. If one of those students graduates, transfers, or does not deserve the badge anymore,
    //  quantity must be incremented. 
    quantity: {
        type: Number
    },
    //URL link to image of badge
    imageLink: {
        type: String
    } 
})

let Badge = module.exports = mongoose.model('Badge', BadgeSchema);