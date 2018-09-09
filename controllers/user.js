const userModel = require('../models/user').model;
const createError = require('http-errors');
const errorHandler = require('../helpers/errorHandler');
const unlink = require('../helpers/unlink').unlinkFile;
const hasher = require('../config/hasher');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.createUser = async (req, res, next) => {
    try {
        user = new userModel(req.body)
        user.profile_picture = req.file ? req.file.path : '';
        if (!req.body.password)
            return next(createError(400, 'Password required'));
        user.password = await hasher.hash(req.body.password, 10);
        user = await user.save();
        res.status(201).json({
            "message": "success",
            "operation": "POST/user",
            "data": user._id
        });
    } catch (err) {
        /**unlinking uploads at this stage could cause code race */
        if (req.file)
            unlink(req.file.path, (err) => {
                next(err)
            })
        return next(err);
    }
}
exports.getJWT = async (req, res, next) => {
    //TODO: Find User then compare password
    email = req.body.email;
    password = req.body.password;
    user = await userModel.findOne({ email: email });
    if (user) {
        bcrypt.compare(password, user.password, (err, done) => {
            if (done)
                return res.status(200).send(JWT.sign({ "_id": user._id }, process.env.SECRET_OR_KEY));
            else
                return res.status(401).json({ Operation: "Login", message: "Wrong Password!" });
        })
    }
    else
        res.status(401).json({ Operation: "Login", message: "User Not Founde!" });

    //TODO: compare plain password with salt using bcrypt

}

exports.getUserById = (req, res, next) => {
    const id = req.params._id;
    if (!errorHandler.validateObjId(id))
        return next(createError(400, `Invalid id parameter ${id}`));

    options = {};

    userModel.findOne({ "_id": id }).
        select('-__v -password').
        exec((err, user) => {
            if (err)
                next(err);
            if (!user)
                return next(createError(400, `user not found!`));

            res.status(200).json({
                "operation": "GET/user",
                "Result": user
            });
        });
}

exports.getAllUsers = (req, res, next) => {
    query = {}
    options = {}
    userModel.find(query, options).
        select('-__v -password').
        exec((err, users) => {
            if (err)
                next(err);
            if (!users.length)
                res.status(204).send()
            else
                res.status(200).json({
                    'Operation': 'GET/users', users, Count: users.length
                })
        })
}

exports.deleteUser = (req, res, next) => {
    id = req.params._id;
    if (!errorHandler.validateObjId(id))
        return next(createError(400, `Invalid Parameter id ${id}`));
    userModel.findById(id).exec().then((user) => {

        if (!user)
            throw new Error('User not Found!');

        user.remove().
            then((user) => {
                if (user.profile_picture)
                    unlink(user.profile_picture, (err) => next(err))
                res.status(200).json({
                    'Operation': 'DELETE/user', 'user': user._id
                })
            }).catch(err => next(err));

    }).catch((err) => next(err))


}
exports.deleteManyUsers = async (req, res, next) => {


    try {
        users = await userModel.find({ "_id": { "$in": req.query._id } }).cursor();
        for (doc = await users.next(); doc != null; doc = await users.next()) {
            if (doc.profile_picture)
                try { await fs.unlinkSync(doc.profile_picture) } catch (err) { };
            await doc.remove()
        }
    }
    catch (err) { next(err) };
}
exports.updateUser = (req, res, next) => {
    userModel.findById({ "_id": req.params._id }).
        then((doc) => {
            if (!doc)
                throw new Error('User Not Found!');

            req.body.last_update = Date.now();
            if (doc.profile_picture)
                unlink(doc.profile_picture, err => next(err));
            for (prop in req.body) {
                doc[prop] = req.body[prop];
            }
            doc.profile_picture = req.file ? req.file.path : null;

            doc.save().
                then((user) => {
                    res.status(201).json({
                        "message": "success",
                        "operation": "POST/user",
                        "data": user._id
                    })
                }).catch((err) => {
                    if (req.file)
                        unlink(req.file.path, (err) => {
                            next(err)
                        });
                    return next(err)
                })
        }).catch((err) => {
            if (req.file)
                unlink(req.file.path, (err) => {
                    next(err);
                });
            next(createError(400, err));
        });

}

