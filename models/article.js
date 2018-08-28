const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'tag'
    },

    categories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'category'
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    last_update: {
        type: Date,
        default: Date.now()

    },
    description: {
        type: String,
        required: false
    },
    article_images: {
        main_image: {
            String
        },
        body_images: {
            type: Array
        }
    }
});
// schema.pre('save', (article, next) => {
//     next();


// });
// schema.pre('remove', (article, next) => {
//     next();

// })

exports.articleModel = articleModel = mongoose.model('article', schema);



 /**
  * population may be vital sometimes not always
  * @link https://mongoosejs.com/docs/populate.html */