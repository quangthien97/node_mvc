const express = require('express');
const router = express.Router();
const verify = require('../middleware/auth');
const PostModel = require('../models/Posts');
const LikeModel = require('../models/Like');


router.post('/:_idpost', verify, async function (req, res, next) {
    try {
        const _idPost = req.param._idPost;
        const userId = user._id;
        const like = await LikeModel.findOne({ userId: userId, postId: _idPost });
        if (!like) {
            const Like = new LikeModel({ userId: userId, postId: _idPost });
            const newlike = await Like.save();
            const likeCount = await LikeModel.count({ postId: _idPost });
            return res.json({
                code: 200,
                message: "da like post",
                likeCount: likeCount,
                data: null
            })
        } else {
            const likeCount = await LikeModel.count({ postId: _idPost });
            return res.json({
                code: 200,
                message: "da like bai nay",
                likeCount: likeCount
            })
        }
    } catch (err) {
        return res.json({
            code: 400,
            message: err.message,
            data: null
        })
    }
});



router.post("/unlike/:_idpost", verify, async (req, res) => {
    try {
        const _idPost = req.param._idPost;
        const userId = user._id;
        const like = await LikeModel.findOne({ userId: userId, postId: _idPost });
        if (!like) {
            const likeCount = await LikeModel.count({ postId: _idPost });
            return res.json({
                code: 200,
                message: "chua like bai nay",
                likeCount: likeCount
            })
        } else {
            const like = await LikeModel.deleteOne({ userId: userId, postId: _idPost })
            const likeCount = await LikeModel.count({ postId: _idPost });
            return res.json({
                code: 200,
                message: "da unlike bai nay",
                likeCount: likeCount
            })
        }
    } catch (err) {
        return res.json({
            code: 400,
            message: err.message,
            data: null
        })
    }
})

router.get("/getpost", verify, async (req, res) => {
    try {
        let getpost = [];
        const userId = user._id;
        const post = await PostModel.find({});
        for (let i = 0; i < post.length; i++) {
            const element = JSON.parse(JSON.stringify(post[i]))
            console.log(element);
            const like = await LikeModel.findOne({ userId: userId, postId: post[i]._id });
            const likeCount = await LikeModel.count({ postId: post[i]._id });
            if (!like) {
                element.liked = false;
                element.likeCount = likeCount;
                getpost.push(element);
            } else {
                element.liked = true;
                element.likeCount = likeCount;
                getpost.push(element);
            }
        }
        res.json({ getpost })
    } catch (err) {
        console.error(err);
        return res.json({
            code: 400,
            message: err.message,
            data: null
        })
    }
})
module.exports = router;
