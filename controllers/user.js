const userModel = require('../models/user').model;
const createError = require('http-errors');
const errorHandler = require('../errorHandler');
exports.createUser = (req, res, next) => {
    user = new userModel(req.body)

    for (prob in req.body) {

        user[prob] = req.body[prob]
    }

    user.save((err, user) => {
        if (err)
            return next(err);
        if (!user)
            return next(createError(500, 'somthing wrong'));

        res.status(201).json({
            "message": "success",
            "operation": "POST/user",
            "data": user._id
        })
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
    userModel.findById(id, (err, user) => {
        if (err)
            next(err);
        if (!user)
            next(createError(400, 'Somthing wrong'));
        user.remove();
        res.status(200).json({
            'Operation': 'deleteUser', 'user': user._id
        })
    })


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
    userModel.getUser({ "_id": req.params._id }, function (err, doc) {
        if (err)
            next(createError(400, err));
        if (!doc)
            next(createError(400, "User not found"));
        for (prop in req.body) {
            doc[prop] = req.body[prop];

        }

        doc.save((err, doc) => {
            if (err)
                return next(createError(400, err));
            if (!doc)
                return next(createError(400, "doc not found"));
            res.status(200).json({ "operation": "updateuser", "updateuser": doc.user_name })

        });
    });

}

