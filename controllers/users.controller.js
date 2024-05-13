var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const asyncWrapper = require('../middleware/asyncWrapper');
const User = require('../models/user.model');
const appError = require('../utils/appError');
const { SUCCESS, FAIL, ERROR } = require('../utils/httpStatusText');


const getAllUsers = asyncWrapper(async(req, res) => {
  const query = req.query
  let limit = query.limit || 10,
  page = query.page || 1,
  skip = (page - 1) * limit;
  const users = await User.find({},{"__v":false,password:false}).limit(limit).skip(skip)
  const totalRecords = await User.countDocuments()

  res.send({status:SUCCESS,data:{users,totalRecords}})
})


const register = asyncWrapper(async(req, res, next) => {
  
  const { firstName, lastName, email, password} = req.body

  if(!firstName) return next(new appError(400,"firstName is required."));
  if(!lastName) return next(new appError(400,"lastName is required."));
  if(!password) return next(new appError(400,"password is required."));
  if(!email) return next(new appError(400,"email is required."));

  const oldUser = await User.findOne({email})
  console.log(oldUser);
  if(oldUser) return next(new appError(400,"User is already exists"));

  const passwordHash = await bcrypt.hash(password,10)
  
  const user = new User({firstName, lastName, email, password:passwordHash},process.env.SECRET_KEY)
  
  const token = await jwt.sign({ email: user.email,id:user._id }, 'shhhhh');
  console.log(token,"token");

  user.save()
  return res.status(201).send({status:SUCCESS,data:{user}})
})


const login = asyncWrapper(async(req, res, next) => {
  const { email, password} = req.body
  
  if(!email && !password) return next(new appError(400,"email and password is required."));
  
  const oldUser = await User.findOne({email:email})
  if(!oldUser) return next(new appError(400,"User is not exists"));
  
  const comparedPassword = await bcrypt.compare(password,oldUser.password)
  console.log(oldUser,comparedPassword);

  if(!oldUser || !comparedPassword) return next(new appError(400,"Error in Email Or Password."));
  console.log(comparedPassword,"comparedPassword");

  // const users = await User.create()
  return res.send({status:SUCCESS,data:{oldUser}})
})

module.exports = {
  getAllUsers,
  register,
  login
}