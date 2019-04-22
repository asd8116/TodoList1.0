const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      // 檢查 email 是否存在
      console.log('User already exists')
      res.render('register', {
        // 使用者已經註冊過
        name,
        email,
        password,
        password2
      })
    } else {
      const newUser = new User({
        // 如果 email 不存在就直接新增
        name,
        email,
        password
      })

      // 先用 genSalt 產生「鹽」，第一個參數是複雜度係數，預設值是 10
      bcrypt.genSalt(10, (err, salt) =>
        // 再用 hash 把鹽跟使用者的密碼配再一起，然後產生雜湊處理後的 hash
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          // 用 bcrypt 處理密碼後，再把它儲存起來
          newUser
            .save()
            .then(user => {
              res.redirect('/')
            })
            .catch(err => console.log(err))
        })
      )
    }
  })
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
