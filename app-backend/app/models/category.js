const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')
const Schema=mongoose.Schema
const categorySchema=new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})
categorySchema.plugin(uniqueValidator)
const Category=mongoose.model('Category',categorySchema)
module.exports=Category