require('dotenv').config()
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const hbs = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const app = express()

// CONFIG
require('./db/config')
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}))
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts/')}))
app.set('view engine', 'hbs')

// ROUTES
app.use('/', require('./routes/index'))
app.use('/example', require('./routes/example'))
app.use(require('./routes/error'))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
