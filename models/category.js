const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

exports.categoryModel = categoryModel = mongoose.model('category', schema);


exports.getCategories = (condition, options, projection, callback, limit) => {
    categoryModel.find(condition, options, projection, callback).limit(limit)
}
exports.getOneCategory = (id, callback) => {

    categoryModel.findById(id, callback)
}
exports.createCategory = (category, callback) => {
    categoryModel.create(category, callback)
}
exports.deleteCategory = (id, callback) => {
    categoryModel.findByIdAndRemove(id, callback);
}
exports.deleteManyCategorys = (query, callback) => {
    categoryModel.deleteMany(query, callback)
}
exports.updateCategory = (id, update, options, callback) => {
    categoryModel.findByIdAndUpdate(id, update, options, callback)
}


