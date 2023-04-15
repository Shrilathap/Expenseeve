const express=require('express')
const multer=require('multer')
const path=require('path')
const router=express.Router()
const userCltr=require('../app/controllers/userCltr')
const budgetCltr=require('../app/controllers/budgetCltr')
const {authenticateUser,authorizeUser}=require('../app/middlewares/authenticateUser')
const categoryCltr = require('../app/controllers/categoryCltr')
const expenseCltr = require('../app/controllers/expenseCltr')
const profileCltr=require('../app/controllers/profileCltr')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null,Date.now() + '-' + file.originalname);
  }
});
  const upload = multer({ storage: storage });

router.post('/api/users/register',userCltr.register)
router.post('/api/users/login',userCltr.login)
router.get('/api/users/account',authenticateUser,userCltr.account)

router.get('/api/users/budget',authenticateUser,budgetCltr.show)
router.put('/api/users/budget', authenticateUser, budgetCltr.update)
router.delete('/api/users/budget',authenticateUser,budgetCltr.destroy)

router.post('/api/categories',authenticateUser,categoryCltr.create)
router.get('/api/categories',authenticateUser,categoryCltr.list)
router.get('/api/categories/:id',authenticateUser,categoryCltr.show)
router.delete('/api/categories/:id',authenticateUser,categoryCltr.destroy)

router.post('/api/expenses',authenticateUser,expenseCltr.create)
router.get('/api/expenses',authenticateUser,expenseCltr.list)
router.get('/api/expenses/:id',authenticateUser,expenseCltr.show)
router.put('/api/expenses/:id',authenticateUser,expenseCltr.update)
router.delete('/api/expenses/:id',authenticateUser,expenseCltr.destroy)
router.delete('/api/expenses/softdelete/:id',authenticateUser,expenseCltr.softDestroy)
router.get('/api/expenses/restored/:id',authenticateUser,expenseCltr.restore)

router.post('/api/profile',authenticateUser,profileCltr.create)
router.get('/api/profile',authenticateUser,profileCltr.show)
router.put('/api/profile/:id',authenticateUser,profileCltr.update)
router.delete('/api/profile/:id',authenticateUser,profileCltr.destroy)

router.post('/api/upload-profile', upload.single('profilePic'),authenticateUser, userCltr.profile)
router.get('/api/upload-profile', authenticateUser, userCltr.getProfile)

module.exports=router