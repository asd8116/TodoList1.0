const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

// routes
app.get('/', (req, res) => {
  res.send('Gooood')
})

app.listen(port, () => {
  console.log(`${port}`)
})