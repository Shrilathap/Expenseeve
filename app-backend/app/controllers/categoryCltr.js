const Category=require('../models/category')
const Expense=require('../models/expense')
const categoryCltr={}

categoryCltr.list = (req, res) => {
    Category.find({ userId: req.user.id })
    .then(categories => res.json(categories))
}

categoryCltr.create=(req,res)=>{
    const body = req.body
    const category = new Category(body)
    category.userId =req.user.id
    category.save()
        .then(category => res.json(category))
        .catch(err => res.json(err))
}

categoryCltr.show=(req,res)=>{
    const id=req.params.id
    Category.findOne({userId: req.user.id, _id: id})
    .then(category => {
        if (!category) {
          res.status(404).json()
        }
        res.json(category)
    })
}

categoryCltr.destroy = async (req, res) => {
    const id = req.params.id;
  
    try {
      const category = await Category.findOne({ userId: req.user.id, _id: id });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      await Expense.deleteMany({ categoryId: id });
      await category.remove();
  
      res.json(category);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

// categoryCltr.destroy=(req,res)=>{
//     const id = req.params.id
//     Category.findOne({ userId: req.user.id, _id: id })
//         .then((category) => {
//             return Expense.deleteMany({categoryId:id})
//             .then(()=>category.remove())
//         })
//         .then((category)=>{
//             res.json(category)
//         })
//         .catch((err)=>{
//             res.status(400).json({message:err.message})
//         })
// }

module.exports=categoryCltr