const mongoose = require('mongoose');
const errorHandler = require('../helpers/errorHandler')
const schema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    }

});


// schema.pre('remove', (tag, next) => {

//     tag.model('article').find({ "tags._id": { "$in": tag._id } }, (err, tags) => {
//         console.log(tags);

//     })
//     next();

// })
schema.post('remove', (doc, next) => {

    doc.model('article').findOneAndUpdate({ "tags._id": { "$in": [doc._id] } }, { $pull: { 'tags._id': doc._id } }, (err, tags) => {
        if (err)
            return next(err);
        if (!doc)
            return next(createError(500, 'internal server error'));

        next();

    })

});
exports.model = model = mongoose.model('tag', schema);