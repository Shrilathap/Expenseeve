const Profile=require('../models/profile')
const multer = require('multer')

const profileCltr={}


profileCltr.create=(req,res)=>{
    const body=req.body
    const profile=new Profile(body)
    profile.userId=req.user.id
    profile.save()
    .then(profile=>res.json(profile))
    .catch(err=>res.json(err))
}

profileCltr.show = async (req, res) => {
    try {
      const userId = req.user.id
      const profile = await Profile.findOne({ userId: userId })
      if (!profile) {
        res.status(404).json()
        return
      }
      res.json(profile)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  

profileCltr.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Profile.findOneAndUpdate({userId: req.user.id, _id: id},{ $set: body }, { new: true, runValidators: true })
    .then(profile=>{
        if(!profile){
            res.status(404).json()
        }
        res.json(profile)
    })
}

profileCltr.destroy=(req,res)=>{
    const id=req.params.id
    Profile.findOneAndDelete({userId: req.user.id, _id: id})
    .then(profile=>{
        if(!profile){
            res.status(404).json()
        }
        res.json(profile)
    })
}

module.exports=profileCltr
