const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;

exports.errorHandler = (err, req, res, next) => {
    console.log(err.stack)
    res.status(err.status || 406).json({ "Error": err.message });
};

exports.validateObjIds = (data) => {
    for (id of data) {
console.log(id);

        if (!ObjectId.isValid(id))
            return false;
    }
    return true;
}
exports.validateObjId = (id) => {
    return ObjectId.isValid(id)
}