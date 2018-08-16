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

    }

});

exports.userModel = userModel = mongoose.model('user', schema);

//Get User
exports.getUser = (condition, callback) => {
    userModel.findOne(condition, callback);
}
//Get Users
exports.getAllUsers = (condition, options, projection, callback) => {
    userModel.find(condition, options, projection, callback);
}
//create User
exports.createUser = (user, callback) => {
    userModel.create(user, callback);

}
//delete User
exports.deleteUser = (id, callback) => {
    userModel.findByIdAndRemove(id, callback);
}
//delete Users
exports.deleteUsers = (query, callback) => {
    userModel.deleteMany(query, callback);
}
//update User
exports.updateUser = (id, user, callback) => {
    userModel.findByIdAndUpdate(id, user, callback);
}