let { courses } = require('../data/courses')

const getAllCourses = (req, res) => {
  res.send(courses)
}

const getSingleCourse = (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) {
    res.status(404).send({msg:'The course with the given ID was not found.'})
  }
  res.send(course)
}

const addCourse = (req, res) => {
  try{
    const {title , price} = req.body
    if(!title){
      return res.status(400).send({msg:'title is required'})
    }
    if(!price){
      return res.status(400).send({msg:'price is required'})
    }
    const course = {
      id: courses.length + 1,
      title,
      price
    }
    courses.push(course)
    res.send(course)
  }catch(e){
    res.status(500).send(e.message)
  }
}

const updateCourse = (req,res)=>{
  const id = +req.params.id

  let course = courses.find(c => c.id === parseInt(id))
  
  if (!course) {
    res.status(404).send({msg:'The course with the given ID was not found.'})
  }
  
  const updatedCourse = req.body
  
  console.log(updatedCourse,"updatedCourse");
  course = {...course,...updatedCourse}
  
  res.send(course)
}


const deleteCourse = (req,res)=>{
  const id = +req.params.id

  let course = courses.find(c => c.id === parseInt(id))
  
  if (!course) {
    res.status(404).send({msg:'The course with the given ID was not found.'})
  }
  
  courses = courses.filter((c) => c.id != id)

  res.send({success:true})
}


module.exports = {
  addCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse
}