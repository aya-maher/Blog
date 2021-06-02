const mongoose = require('mongoose');
const validator = require('validator');


const postSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true,
    trim: true
  },
  description:{
    type:String,
    required: true,
    trim: true
  },
   tags:{
    type:[String],
    trim: true
  },
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  }
},{
  timestamps: true
})

const Post = mongoose.model('Post', postSchema )
  
module.exports = Post