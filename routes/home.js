const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

router.get('/', (req, res) => {
  Todo.find({})
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