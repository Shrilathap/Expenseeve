const mongoose=require('mongoose')
mongoose.set('strictQuery', false)
const configureDB=()=>{
    mongoose.connect('mongodb://localhost:27017/expenseeve')
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log('error connecting db',err)
    })
}
module.exports=configureDB