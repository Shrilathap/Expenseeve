const Budget=require('../models/budget')
const budgetCltr={}

budgetCltr.show=(req,res)=>{
    Budget.findOne({userId: req.user.id})
    .then(budget => {
        if (!budget) {
            res.status(404).json()
        }
        res.json(budget)
    })
}
budgetCltr.update=(req,res)=>{
    const body=req.body
    Budget.findOneAndUpdate({userId:req.user.id},{ $set: body },{ new: true,runValidators: true })
    .then(budget => {
        if (!budget) {
            res.status(404).json()
        }
        res.json(budget)
    })
}

budgetCltr.destroy=(req,res)=>{
Budget.findOneAndDelete({userId:req.user.id})
.then(budget => {
    if (!budget) {
        res.status(404).json()
    }
    res.json(budget)
})
}
module.exports=budgetCltr