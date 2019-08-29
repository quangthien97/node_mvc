const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({ 
    userId:String, 
    postId:String
});

const LikeModel = mongoose.model('Like', schema);

module.exports = LikeModel;