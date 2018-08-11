const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./server/router')
const mongo = require('koa-mongo')

// body parser
app.use(bodyParser())

// database info
const databaseURL = 'localhost'
const databasePort = 27017
const dbName = 'exchange'

// connect to database
app.use(mongo({
  host: databaseURL,
  port: databasePort,
  /* user: 'user',
  pass: 'pwd123456', */
  db: dbName,
  max: 100,
  min: 1
}))

// router of Koa
router(app)

// run server
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})
