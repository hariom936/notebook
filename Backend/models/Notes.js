const mongoose =  require('mongoose');

const NotesSchema = new Schema({
   name:{
    type: String,
    require: true
   },
   description:{
    type: String,
    require: true,
   },
  tag:{
    type: String,
    default: "General"
   },
   date:{
    type: Date,
   default: date.now
   },
  });

  module.exports =mongoose.model('notes', NotesSchema);