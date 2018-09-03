const mongoose = require('mongoose');
const unlink = require('../helpers/unlink').unlinkFile
const schema = mongoose.Schema({
    name: {

        firstname: {
            type: String,
            required: true,
            trim: true

        },
        middlename: {
            type: String,
            trim: true

        },
        lastname: {
            type: String,
            trim: true

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
        unique: true,
        trim: true

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
        type: String,
        trim: true

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

    user.model('article').find({ "author": user._id }, (err, articles) => {
        if (err)
            return next(err);
        if (!user)
            return next(createError(400, 'Author not found in User list!'));

        articles.map((article) => {
            if (article.article_images.body_images)
                article.article_images.body_images.map((image) => unlink(image, (err) => next(err)));
            if (article.article_images.main_image)
                unlink(article.article_images.main_image, (err) => next(err));
        });
        next();

    });
})

exports.model = userModel = mongoose.model('user', schema);

