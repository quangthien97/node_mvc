const express = require('express');
const router = express.Router();

const UserModel = require('../models/Users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await UserModel.find();
    return res.render('users', { users, title: 'USERS PAGE' });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* POST users create. */
router.post('/', async function(req, res, next) {
  try {
    const { username, password } = req.body;
    const UserClass = new UserModel({ username, password });
    const user = await UserClass.save();

    return res.json({ code: 200, errorMess: '', data: { user }});
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* PUT users edit. */
router.put('/:_id', async (req, res, next)=>{
  try{
    const _id = req.params._id
    const {username, password} = req.body;
    const userUpdate = await UserModel.updateOne({_id : _id},{username : username, password:password});
    return res.json({ code: 200, errorMess: '', data: { userUpdate }});
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
})

/* DELETE users delete. */
router.delete('/:_id', async (req, res, next)=>{
  try{
    const _id = req.params._id;
    const userDelete = await UserModel.deleteOne({_id : _id});
    return res.json({ code: 200, errorMess: '', data: { userDelete }});
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
})

module.exports = router;
