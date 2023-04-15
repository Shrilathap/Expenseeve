const express=require('express')
const cors=require('cors')
const configureDB=require('./config/database')
const router=require('./config/routes')
const app=express()
app.use("/uploads", express.static("uploads"))
const port=3065
app.use(express.json())
app.use(cors())
configureDB()
app.use(router)
app.listen(port,()=>{
    console.log('server is running on port',port)
})
