const mongoose=require('mongoose')
const isEmail=require('validator/lib/isEmail')
const passwordFormat=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const uniqueValidator=require('mongoose-unique-validator')
const bcrypt=require('bcryptjs')

const Schema=mongoose.Schema
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return isEmail(value)
            },
            message:function(){
                return 'invalid email format'
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:128,
        validate:{
            validator:function(value){
                return passwordFormat.test(value)
            },
            message:function(){
                return 'password should consist of one uppercase letter, one number and one special character'
            }
        }
    },
    role:{
        type:String,
        required:true,
        default:'user',
        enum:['admin','user']
    },
    profileUrl:{
        type:String
    }
},{timestamps:true})
userSchema.plugin(uniqueValidator)

userSchema.pre('save',function(next){
    const user=this
    bcrypt.genSalt()
    .then((salt)=>{
        bcrypt.hash(user.password, salt)
        .then((encrypted)=>{
            user.password=encrypted 
            next()  
        })
    })
})


const User=mongoose.model('User',userSchema)
module.exports=User