const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const UserModel = require('../models/Users');
const PostModel = require('../models/Posts');
const verify = require('../middleware/auth');
/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const posts = await PostModel.find({});
    return res.render('posts', { posts, title: 'POST PAGE' });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* POST users create. */
router.post('/', verify, async function (req, res, next) {
  try {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    const body = {};
    let image = [];
    const userName = await UserModel.findOne({ _id: user._id });
    form.uploadDir = './public/images/';
    form.parse(req)
      .on('fileBegin', function (name, file) {
        file.path = file.path + ".jpeg";
      })
      .on('file', function (name, file) {
        console.log(file.path)
        image.push(file.path);
      })
      .on('field', function (name, field) {
        body[name] = field;
      })
      .on('error', function (err) {
        throw err;
      })
      .on('end', async function () {
        const Post = new PostModel({ title: body.title, createdBy: userName, image: image });
        const post = await Post.save();
        return res.json({ code: 200, message: null, data: post })
      });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

router.use('/media', express.static('media'));

/* PUT users edit. */
router.put('/:_id', async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();
    const body = {};
    let image = '';
    const userId = user._id;
    const _postId = req.param._id;
    form.uploadDir = './media';
    form.parse(req)
      .on('file', function (name, file) {
        image = file.path + "jpeg";
      })
      .on('field', function (name, field) {
        body[name] = field;
      })
      .on('error', function (err) {
        throw err;
      })
      .on('end', async function () {
        const post = await PostModel.updateOne({ _id: _postId }, { title: body.title, createdBy: userId, image: image });
        return res.json({ code: 200, message: null, data: post })
      });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
})

/* DELETE users delete. */
router.delete('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;
    const postDelete = await UserModel.deleteOne({ _id: _id });
    return res.json({ code: 200, errorMess: '', data: { postDelete } });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
})

module.exports = router;
