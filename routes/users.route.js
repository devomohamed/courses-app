const express = require('express')
const {body,validationResult} = require('express-validator')

const router = express.Router()
const { getAllUsers, register, login } = require('../controllers/users.controller')


router.route('/')
  .get(getAllUsers);

router.route('/register').post(register)
router.route('/login').post(login)


module.exports = router;