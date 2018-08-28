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
        required: 'Username is required',
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: [

            function (password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ]
    },
    profile_picture: {
        type: String
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
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


schema.virtual('fullName').
    get(function () { return this.name.firstname + ' ' + this.name.lastname; }).
    set(function (v) {
        this.name.firstname = v.substr(0, v.indexOf(' '));
        this.name.lastname = v.substr(v.indexOf(' ') + 1);
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

