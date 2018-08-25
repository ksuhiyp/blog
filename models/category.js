const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true

    },
    articles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'articles'

    }
});
exports.model = model = mongoose.model('category', schema);