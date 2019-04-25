const mongoose = require('mongoose')
const Todo = require('../todo')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')

  for (let i = 0; i < 10; i++) {
    Todo.create({
      name: 'name-' + i,
      userId: '5cc06ecef267673edc48efdc'
    })
  }

  console.log('done')
})
