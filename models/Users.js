const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { USERS } = require('../constant');
const schema = new Schema({ 
  username: String,
  password: String,
  role: { type :String , default:USERS.ROLE.CUSTOMER }
});

const UserModel = mongoose.model('User', schema);

module.exports = UserModel;