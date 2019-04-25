const mongoose = require('mongoose')
const User = require('../user')
const bcrypt = require('bcryptjs')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection

const password1 = bcrypt.hashSync('123456', 10)

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  User.create({
    name: 'Wanaka03',
    email: 'Wanaka03@gmail.com',
    password: password1
  })

  console.log('done')
})
