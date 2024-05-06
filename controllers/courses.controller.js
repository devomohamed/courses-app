const Course = require('../models/course.model');
const { SUCCESS, FAIL, ERROR } = require('../utils/httpStatusText');

const getAllCourses = async(req, res) => {
  // console.log(Course);
  const query = req.query
  let limit = query.limit || 10,
  page = query.page || 1,
  skip = (page - 1) * limit;
  const courses = await Course.find({},{"__v":false}).limit(limit).skip(skip)
  const totalRecords = await Course.countDocuments()
  // if (!courses) {
  //   res.status(404).send({status:FAIL,data:{Courses:'The courses was not found.'}});
  // }
  // console.log(courses);
  res.send({status:SUCCESS,data:{courses,totalRecords}})
}

const getSingleCourse = async(req, res) => {
  try{
    const course = await Course.findById(req.params.id)
  if (!course) {
    res.status(404).send({status:FAIL,data:null,message:'The course with the given ID was not found.'})
  }
  res.send({status:SUCCESS,data:{course}})
  }catch(e){
    res.status(500).send({status:ERROR,data:null,message:e.message})
  }
}

const addCourse = async(req, res) => {
  try{
    const {title , price} = req.body
    if(!title){
      return res.status(400).send({status:FAIL,data:null,message:'Title is required'})
    }
    if(!price){
      return res.status(400).send({status:FAIL,data:null,message:'Price is required'})
    }
    const course =  new Course({
      title,
      price
    })
    await course.save()
    res.status(201).send({status:SUCCESS,data:{course}})
  }catch(e){
    console.log(e);
    res.status(500).send({status:ERROR,data:null,message:e.message})
  }
}

const updateCourse = async(req,res)=>{
  let course = await Course.findById(req.params.id)
  if (!course) {
    res.status(404).send({status:FAIL,data:null,message:'The course with the given ID was not found.'})
  }

  const {title , price} = req.body

  const updatedCourse = await Course.findByIdAndUpdate(req.params.id,{title,price}) 
  await updatedCourse.save() 

  course = await Course.findById(req.params.id)
  
  res.send({status:SUCCESS,data:{course}})
}


const deleteCourse = async(req,res)=>{

  try{
    let course = await Course.findById(req.params.id)
  
    console.log(course);
  if (!course) {
    res.status(404).send({status:FAIL,data:null,message:'The course with the given ID was not found.'})
  }
  
  const deletedCourse = await Course.findByIdAndDelete(req.params.id)
  
  res.send({status:SUCCESS,data:null})
  }catch(e){
    res.status(500).send({status:ERROR,data:null,message:e.message})
  }
}


module.exports = {
  addCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse
}