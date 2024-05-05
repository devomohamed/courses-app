const express = require('express')
var morgan = require('morgan')
const mongoose = require('mongoose')

const coursesRouter = require('./routes/courses.route')

const dbName = 'madrasa'
const url = `mongodb+srv://mohamed:KQi35wKTDi4ZjNa3@learn-mongo-db.vo1mhvv.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=learn-mongo-db`;
mongoose.connect(url).then(()=>{console.log("mongodb server started");})


const app = express()
const port = 3000

app.use(morgan('combined'))
app.use(express.json())

app.use('/api/courses',coursesRouter)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})