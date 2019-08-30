const express = require('express');
const router = express.Router();
const verify = require('../middleware/auth');
const UserModel = require('../models/Users');

/* GET users listing. */
router.get('/users', verify, async function (req, res, next) {
    try {
        const UserRole = await UserModel.findOne({ _id: user._id });
        if (UserRole.role == "admin") {
            const users = await UserModel.find({ role: "customer" });
            return res.render('admin/users', { users, title: 'USERS PAGE' });
        } if(UserRole.role == "customer"){
            res.redirect('/posts');
        }
        else {
            res.redirect('/');
        }
    } catch (err) {
        return res.json({ code: 400, errorMess: err, data: null });
    }
});


module.exports = router;
