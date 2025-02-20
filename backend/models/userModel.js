import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   fullName: {type:String, required:true},
   profilePicture: {type:String, required:true},
   id: {type:String, required:true},
   email: {type:String, required:true},
   posts: [{type:mongoose.Schema.Types.ObjectId, ref:'Post'}]
}, {timestamps:true});

export const User = mongoose.model('User', userSchema);