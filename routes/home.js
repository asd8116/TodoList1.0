const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  Todo.find({ userId: req.user._id })
    .sort({
      name: 'asc'
    })
    .exec((err, todos) => {
      if (err) return console.error(err)
      return res.render('index', {
        todos: todos
      })
    })
})

module.exports = router
