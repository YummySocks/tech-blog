// importing in the required packaches

const path = require('path')
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const helpers = require('./utils/helpers')

const app = express()
const PORT = process.env.PORT || 3001

const sequelize = require('./config/config')

const SequelizeStore = require('connect-session-sequelize')(session.Store)
// basic setup for express-session
const sess = {
    secret: 'Super secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  }

app.use(session(sess))

const hbs = exphbs.create({ helpers })

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
// most of the setup for the route of the app
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(require('./controllers'))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
  sequelize.sync({ force: false })
})