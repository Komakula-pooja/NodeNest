const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min:2,
  },
  content: {
    type: String,
    required: true,
    min: 5,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  isArchived: {
    type:Boolean,
    default:false
  },
  isTrashed:{
    type:Boolean,
    default:false
  },
  trashedAt:{
    type:Date,
    default:null
  },
  fontSize:{
    type:String
  },
  fontStyle:{
    type:String
  },
  textColor:{
    type:String
  },
  backgroundColor:{
    type:String
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Note', noteSchema);
