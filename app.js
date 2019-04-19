const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const app = express()
const mongoose = require('mongoose')
const Todo = require('./models/todo')

mongoose.connect('mongodb://localhost/todo', {
  useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
)

app.set('view engine', 'handlebars')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(methodOverride('_method'))

// 使用 express session
app.use(
  session({
    secret: 'your secret key' // secret: 定義一組自己的私鑰（字串)
  })
)
// 使用 Passport
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

// routes
app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todos'))
app.use('/users', require('./routes/users')) // 新增的 user 路由器

app.listen(3000, () => {
  console.log('App is running!')
})
