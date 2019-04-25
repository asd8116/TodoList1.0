const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash') // 載入 connect-flash
const app = express()
const mongoose = require('mongoose')
const Todo = require('./models/todo')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo', {
  useNewUrlParser: true,
  useCreateIndex: true
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
    secret: 'your secret key', // secret: 定義一組自己的私鑰（字串)
    resave: 'false',
    saveUninitialized: 'false'
  })
)

// 使用 Connect flash
app.use(flash())

// 使用 Passport
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated() // 辨識使用者是否已經登入的變數，讓 view 可以使用
  // 新增兩個 flash message 變數
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// routes
app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todos'))
app.use('/users', require('./routes/users')) // 新增的 user 路由器
app.use('/auth', require('./routes/auths')) // 把 auth route 加進來

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running!')
})
