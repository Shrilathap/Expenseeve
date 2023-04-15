const mongoose=require('mongoose')
const Schema=mongoose.Schema
const budgeSchema=new Schema({
    amount:{
        type:Number,
        default:0,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

const Budget=mongoose.model('Budget',budgeSchema)
module.exports=Budget