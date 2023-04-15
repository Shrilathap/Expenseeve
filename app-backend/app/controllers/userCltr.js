const User=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Budget = require('../models/budget')
const Profile=require('../models/profile')
const userCltr={} 
userCltr.register=(req,res)=>{
    const body=req.body
    const user=new User(body)
    user.save()
        .then((user) => {
            const budget=new Budget({userId:user._id})
            budget.save()
            const profile=new Profile({userId:user._id})
            profile.save()
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}
userCltr.login=(req,res)=>{
    const body=req.body
    User.findOne({email:body.email})
    .then((user)=>{
        const payload={id:user._id,role:user.role}
        if(user){
            bcrypt.compare(body.password, user.password)
            .then((result)=>{
                if(result){
                    const token=jwt.sign(payload,process.env.JWT_SECRET)
                    res.json({
                        token:`Bearer ${token}`
                    })
                }
                else{
                    res.json({
                        errors:'invalid email or password'
                    })
                }
            })
        }
        else{
            res.json({
                errors:'invalid email or password'
            })
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}

userCltr.account=(req,res)=>{
    User.findOne({_id:req.user.id})
    .then((user)=>{
        res.json({id:user.id,username:user.username,email:user.email,role:user.role,profileUrl:user.profileUrl})
    })
    .catch((err)=>{
        res.json(err)
    })
}

// profile
userCltr.profile = (req, res) => {
    const file = req.file.path
    const id = req.user.id
    User.findOneAndUpdate({_id: id}, {profileUrl: file}, {new: true, runValidate: true})
        .then((user) => {
            res.json({id:user.id,username:user.username,email:user.email,role:user.role,profileUrl:user.profileUrl})
        })
        .catch(err => res.json(err))
}

userCltr.getProfile = (req, res) => {
    const id = req.user.id
    User.findOne({_id: id})
        .then((user) => {
            res.json({id:user.id,username:user.username,email:user.email,role:user.role,profileUrl:user.profileUrl})
        })
        .catch(err => res.json(err))
}


module.exports=userCltr