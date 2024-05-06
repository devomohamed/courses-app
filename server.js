const express = require('express')
var morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

const coursesRouter = require('./routes/courses.route')

const url = process.env.MONGO_URL;
mongoose.connect(url).then(()=>{console.log("mongodb server started");})


const app = express()
const port = process.env.PORT || 3000

app.use(morgan('combined'))
app.use(express.json())

app.use('/api/courses',coursesRouter)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})