const express = require('express')
var morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const coursesRouter = require('./routes/courses.route')
const usersRouter = require('./routes/users.route')
const { FAIL, ERROR } = require('./utils/httpStatusText')

const url = process.env.MONGO_URL;
mongoose.connect(url).then(()=>{console.log("mongodb server started");}).catch(error=>{console.log(error.message);})


const app = express()
const port = process.env.PORT || 3000


app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

app.use('/api/courses',coursesRouter)
app.use('/api/users',usersRouter)
app.all('*',(req,res,next)=>{
  res.status(404).send({
    status:FAIL,
    data:null,
    message:"The requested resource was not found."
  })
})

// global error handler
app.use((error, req , res , next)=>{
  // console.log(("----------------------------------------"));
  // console.log(("-----------> ",error," <----------------------------------------"));
  // console.log(("----------------------------------------"));
  res.status(error.statusCode || 500).send({
    status:ERROR,
    data:null,
    message:error.message
  })
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})