const mongoose = require('mongoose');
const schema = mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    middle_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    twitter: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    language: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false
    }, create_date: {
        type: Date,
        default: Date.now
    },
    last_update: {
        type: Date,
        default: null

    },
    articles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'article'
    }

});



schema.post('remove', (user, next) => {
    console.log('pre remove triggered');

    user.model('article').deleteMany({ "_id": { "$in": user.articles } }, (err, article) => {
        if (err)
            return next(err);
        if (!user)
            return next(createError(400, 'Author not found in User list!'));
        next();

    });
})

exports.userModel = userModel = mongoose.model('user', schema);

//Get User
exports.getUser = (condition, population, callback) => {
    userModel.findOne(condition).
        populate(population).
        select('-password -__v').
        exec(callback);
}
//Get Users
exports.getAllUsers = (condition, options, projection, population, callback) => {
    userModel.
        find(condition, options, projection).
        select('-password -__v ').
        populate(population).
        exec(callback);
}
//create User
exports.createUser = (user, callback) => {
    userModel.create(user, callback);

}
//delete User
exports.deleteUser = (id, callback) => {
    userModel.findOne(id, (callback));
}
//delete Users
exports.deleteUsers = (query, callback) => {
    userModel.deleteMany(query, callback);
}
//update User
exports.updateUser = (id, user, options, callback) => {
    userModel.findByIdAndUpdate(id, user, options, callback);
}