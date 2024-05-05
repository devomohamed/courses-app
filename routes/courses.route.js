const express = require('express')
const {body,validationResult} = require('express-validator')

const router = express.Router()
const { addCourse, getAllCourses, getSingleCourse, updateCourse, deleteCourse } = require('../controllers/courses.controller')

// old way
// router.get('/', getAllCourses)
// router.get('/:id', getSingleCourse)
// router.post('/',body('title').notEmpty(), addCourse)
// router.patch('/:id',updateCourse)
// router.delete('/:id',deleteCourse)

router.route('/')
  .get(getAllCourses)
  .post(body('title').notEmpty(), addCourse)

router.route('/:id')
  .get(getSingleCourse)
  .patch(updateCourse)
  .delete( deleteCourse)

module.exports = router;