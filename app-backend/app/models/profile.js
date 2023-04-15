const mongoose=require('mongoose')
const Schema=mongoose.Schema
const profileSchema=new Schema({
    name:{
        type:String,
        default:'',
        required:true
    },
    age:{
        type:Number,
        default:0,
        required:true
    },
    bio:{
        type:String,
        default:'',
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})
const Profile=mongoose.model('Profile',profileSchema) 
module.exports=Profile