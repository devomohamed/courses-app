const express = require('express')
var morgan = require('morgan')
const coursesRouter = require('./routes/courses.route')

const app = express()
const port = 3000

app.use(morgan('combined'))

app.use('/api/courses',coursesRouter)

app.use(express.json())




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})