const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: {

        firstname: {
            type: String,
            required: true
        },
        middlename: {
            type: String
        },
        lastname: {
            type: String
        },
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    twitter: {
        type: String
    },
    country: {
        type: String
    },
    language: {
        type: String
    },
    mobile: {
        type: String
    }, create_date: {
        type: Date,
        default: Date.now
    },
    last_update: {
        type: Date,
        default: null

    }


});



schema.post('remove', (user, next) => {

    user.model('article').deleteMany({ "author": { "$in": user._id } }, (err, article) => {
        if (err)
            return next(err);
        if (!user)
            return next(createError(400, 'Author not found in User list!'));
        next();

    });
})

exports.model = userModel = mongoose.model('user', schema);

