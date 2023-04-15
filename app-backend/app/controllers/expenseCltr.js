const Expense=require('../models/expense')
const mongooseDelete=require('mongoose-delete')
const expenseCltr={}

expenseCltr.list = (req, res) => {
    Expense.find({ userId: req.user.id })
    .then(expenses => res.json(expenses))
}

expenseCltr.create=(req,res)=>{
    const body = req.body
    const expense = new Expense(body)
    expense.userId =req.user.id
    expense.save()
        .then(expense => res.json(expense))
        .catch(err => res.json(err))
}

expenseCltr.show=(req,res)=>{
    const id=req.params.id
    Expense.findOne({userId: req.user.id, _id: id})
    .then(expense => {
        if (!expense) {
            res.status(404).json()
        }
        res.json(expense)
    })
}

expenseCltr.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Expense.findOneAndUpdate({userId: req.user.id, _id: id},{ $set: body }, { new: true, runValidators: true })
    .then((expense)=>{
        if(!expense){
            res.status(404).json()
        }else{
            res.json(expense)
        }
    })
}

expenseCltr.destroy=(req,res)=>{
    const id = req.params.id
    Expense.findOneAndDelete({ userId: req.user.id, _id: id })
        .then((expense) => {
            if(!expense){
                res.status(404).json()
            }
            res.json(expense)
        }) 
}

expenseCltr.softDestroy=(req,res)=>{
    const id = req.params.id
    Expense.findOne({ userId: req.user.id, _id: id })
        .then(expense => {
            if (!expense) {
                res.status(404).json()
            }
            Expense.delete({_id:expense._id},function(err) {
                if (err) {
                  console.error(err);
                } else {
                    Expense.find({userId: req.user.id, _id: id})
                    .then(expense=>{
                        if (!expense) {
                            res.status(404).json()
                        }
                        res.json(expense)
                    })
                }
              })
        })
}

expenseCltr.restore=(req,res)=>{
    const id=req.params.id
    Expense.findOne({userId:req.user.id,_id:id,deleted:true})
    .then((expense)=>{
        if(!expense){
            res.json('record not found')
        }
        expense.restore(function(err,restored){
            if(err){
                res.json(err.message)
            }
            res.json(restored)
        })
    })
}

module.exports=expenseCltr