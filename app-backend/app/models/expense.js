const mongoose=require('mongoose')
const mongooseDelete=require('mongoose-delete')
const Schema=mongoose.Schema

const expenseShema=new Schema({
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    expenseDate:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        default:"",
        required:true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

expenseShema.plugin(mongooseDelete,{deleted:false})

const Expense=mongoose.model('Expense',expenseShema)
module.exports=Expense