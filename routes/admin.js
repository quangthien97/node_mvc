const express = require('express');
const router = express.Router();
const verify = require('../middleware/auth');
const UserModel = require('../models/Users');
const PostModel = require('../models/Posts');
const LikeModel = require('../models/Like');
/* GET users listing. */
router.get('/users', verify, async function (req, res, next) {
    try {
        const UserRole = await UserModel.findOne({ _id: user._id });
        if (UserRole.role == "admin") {
            const users = await UserModel.find({ role: "customer" });
            return res.render('admin/users', { users, title: 'USERS PAGE' });
        } if (UserRole.role == "customer") {
            res.redirect('/posts');
        }
        else {
            res.redirect('/');
        }
    } catch (err) {
        return res.json({ code: 400, errorMess: err, data: null });
    }
});


router.get('/posts', verify, async function (req, res, next) {
    try {
        const UserRole = await UserModel.findOne({ _id: user._id });
        if (UserRole.role == "admin") {
            let getpost = [];
            const userId = user._id;
            const post = await PostModel.find({});
            for (let i = 0; i < post.length;i++) {
                const element = JSON.parse(JSON.stringify(post[i]))  
                console.log(element);
                const like = await LikeModel.findOne({userId:userId, postId:post[i]._id});
                const likeCount =await LikeModel.count({postId:post[i]._id});
                const createBy = await UserModel.findOne({_id:element.createdBy});
                element.createdBy = createBy.username;
                if(!like){
                  element.liked = false;
                  element.likeCount = likeCount;
                  getpost.push(element);
                } else {
                  element.liked = true;
                  element.likeCount = likeCount;
                  getpost.push(element);
                }
              }
              return res.render('admin/posts', { getpost, title: 'POSTS PAGE' });
        } if (UserRole.role == "customer") {
            res.redirect('/');
        }
    } catch (err) {
        return res.json({ code: 400, errorMess: err, data: null });
    }
});

module.exports = router;
