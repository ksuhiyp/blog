const userModel = require('../models/user').model;
const createError = require('http-errors');
const errorHandler = require('../errorHandler');
const fs = require('fs')

exports.createUser = (req, res, next) => {
    user = new userModel(req.body)

    user.profile_picture = req.file ? req.file.path : '';

    user.
        save().
        then((user) => {
            res.status(201).json({
                "message": "success",
                "operation": "POST/user",
                "data": user._id
            })
        }).catch((err) => {

            fs.unlink(req.file.path, (err) => {
                return next(err)
            })
            return next(err);
        })
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
                res.status(200).json(users)
        })
}

exports.deleteUser = (req, res, next) => {
    id = req.params._id;
    if (!errorHandler.validateObjId(id))
        return next(createError(400, `Invalid Parameter id ${id}`));
    userModel.findById(id).exec().then((user) => {

        if (!user)
            throw new Error('User not Found!');

        user.
            remove().
            then((user) => {
                if (user.profile_picture)
                    rs.unlink(user.profile_picture, (err) => { throw new Error(err) })
                res.status(200).json({
                    'Operation': 'DELETE/user', 'user': user._id
                })
            }).catch(err => next(err));

    }).catch((err) => next(err))


}
exports.deleteManyUsers = (req, res, next) => {

    if (!req.query._id)
        next(createError(400, 'No query provided!'));

    if (!errorHandler.validateObjIds(req.query._id))
        next(createError(400, 'dirty ids provided! check your params'));

    else {
        usersToDelete = { '_id': { '$in': req.query._id } }
        userModel.deleteUsers(usersToDelete, (err, users) => {
            if (err)
                next(err);
            if (!users)
                next(createError(400, 'why users are falsy?'));
            else
                res.status(200).json({ "Operation": "delete Many Users", "successfull": users.ok ? true : false, 'deleteCount': users.n })
        })

    }
}
exports.updateUser = (req, res, next) => {
    req.body.last_update = Date.now();
    userModel.
        findById({ "_id": req.params._id }).
        then((doc) => {
            if (!doc)
                throw new Error('User Not Found!');

            for (prop in req.body) {
                doc[prop] = req.body[prop];

            }
            doc.profile_picture = req.file ? req.file.path : null
            doc.
                save().
                then((user) => {

                    res.status(201).json({
                        "message": "success",
                        "operation": "POST/user",
                        "data": user._id
                    })
                }).catch((err) => {
                    if (req.file)
                        fs.unlink(req.file.path, (err) => {
                            return next(err)
                        });
                    return next(err)
                })
        }).catch((err) => {
            if (req.file)
                fs.unlink(req.file.path, (err) => {
                    return next(err);
                });
            next(createError(400, err));
        });

}

