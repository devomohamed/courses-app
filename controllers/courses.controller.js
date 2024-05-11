const asyncWrapper = require('../middleware/asyncWrapper');
const Course = require('../models/course.model');
const appError = require('../utils/appError');
const { SUCCESS, FAIL, ERROR } = require('../utils/httpStatusText');

const getAllCourses = asyncWrapper(async(req, res,next) => {
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
})

const getSingleCourse = asyncWrapper(
  async(req, res, next) => {
    const course = await Course.findById(req.params.id)
    if (!course) {
      const error = new appError(404,'The course with the given ID was not found.')
      // error.message = 'The course with the given ID was not found.'
      // error.statusCode = 404
      return next(error)
      // return  res.status(404).send({status:FAIL,data:null,message:'The course with the given ID was not found.'})
    }
    return res.send({status:SUCCESS,data:{course}})
    // try{
    
    // }catch(e){
    //   res.status(500).send({status:ERROR,data:null,message:e.message})
    // }
})

const addCourse = asyncWrapper( async(req, res,next) => {
  const {title , price} = req.body
    // const error = new Error()
      
    if(!title){
      const error = new appError(404,'Title is required')
      // error.message = 'Title is required'
      // error.statusCode = 404
      return next(error)
      // return res.status(400).send({status:FAIL,data:null,message:'Title is required'})
    }
    if(!price){
      const error = new appError(404,'Price is required')
      // error.message = 'price is required'
      // error.statusCode = 404
      return next(error)
      // return res.status(400).send({status:FAIL,data:null,message:'Price is required'})
    }
    const course =  new Course({
      title,
      price
    })
    await course.save()
    res.status(201).send({status:SUCCESS,data:{course}})
  // try{
    
  // }catch(e){
  //   console.log(e);
  //   res.status(500).send({status:ERROR,data:null,message:e.message})
  // }
})

const updateCourse = asyncWrapper( async(req,res,next)=>{
  let course = await Course.findById(req.params.id)
  if (!course) {
    const error = new appError(404,'The course with the given ID was not found.')
      // error.message = 'The course with the given ID was not found.'
      // error.statusCode = 404
      return next(error)
    // res.status(404).send({status:FAIL,data:null,message:'The course with the given ID was not found.'})
  }

  const {title , price} = req.body

  const updatedCourse = await Course.findByIdAndUpdate(req.params.id,{title,price}) 
  await updatedCourse.save() 

  course = await Course.findById(req.params.id)
  
  res.send({status:SUCCESS,data:{course}})
})


const deleteCourse = asyncWrapper( async(req,res,next)=>{

  let course = await Course.findById(req.params.id)

  console.log(course);
if (!course) {
  const error = new appError(404,'The course with the given ID was not found.')
      // error.message = 'The course with the given ID was not found.'
      // error.statusCode = 404
      return next(error)
  // res.status(404).send({status:FAIL,data:null,message:'The course with the given ID was not found.'})
}

const deletedCourse = await Course.findByIdAndDelete(req.params.id)

res.send({status:SUCCESS,data:null})
  // try{
  // }catch(e){
  //   res.status(500).send({status:ERROR,data:null,message:e.message})
  // }
})


module.exports = {
  addCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse
}