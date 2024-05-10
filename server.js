const express = require('express')
var morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

app.use(cors())

const coursesRouter = require('./routes/courses.route')
const { FAIL } = require('./utils/httpStatusText')

const url = process.env.MONGO_URL;
mongoose.connect(url).then(()=>{console.log("mongodb server started");})


const app = express()
const port = process.env.PORT || 3000

app.use(morgan('combined'))
app.use(express.json())

app.use('/api/courses',coursesRouter)
app.all('*',(req,res,next)=>{
  res.status(404).send({
    status:FAIL,
    data:null,
    message:"The requested resource was not found."
  })
}) 





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})