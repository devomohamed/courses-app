const Course = require('../models/course.model')

const getAllCourses = async(req, res) => {
  console.log(Course);
  const courses = await Course.find() 
  console.log(courses);
  res.send(courses)
}

const getSingleCourse = async(req, res) => {
  try{
    const course = await Course.findById(req.params.id)
  if (!course) {
    res.status(404).send({msg:'The course with the given ID was not found.'})
  }
  res.send(course)
  }catch(e){
    res.status(500).send({msg:e.message})
  }
}

const addCourse = async(req, res) => {
  try{
    const {title , price} = req.body
    if(!title){
      return res.status(400).send({msg:'title is required'})
    }
    if(!price){
      return res.status(400).send({msg:'price is required'})
    }
    const course =  new Course({
      title,
      price
    })
    await course.save()
    res.status(201).send(course)
  }catch(e){
    res.status(500).send(e.message)
  }
}

const updateCourse = async(req,res)=>{
  let course = await Course.findById(req.params.id)
  if (!course) {
    res.status(404).send({msg:'The course with the given ID was not found.'})
  }

  const {title , price} = req.body

  const updatedCourse = await Course.findByIdAndUpdate(req.params.id,{title,price}) 
  await updatedCourse.save() 

  course = await Course.findById(req.params.id)
  
  res.send(course)
}


const deleteCourse = async(req,res)=>{

  try{
    let course = await Course.findById(req.params.id)
  
    console.log(course);
  if (!course) {
    res.status(404).send({msg:'The course with the given ID was not found.'})
  }
  
  const deletedCourse = await Course.findByIdAndDelete(req.params.id)
  
  res.send({success:true})
  }catch(e){
    res.status(500).send(e.message)
  }
}


module.exports = {
  addCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse
}