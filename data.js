const _ = require('lodash')
const axios = require('axios')
const MongoClient = require('mongodb').MongoClient
const schedule = require('node-schedule')
const assert = require('assert')

// Connection URL of Mongodb
const dbUrl = 'mongodb://localhost:27017'
// Database Name
const dbName = 'exchange'
// Colletcion Name
const collectionName = 'bitcoin'

// Use connect method to connect to the server
MongoClient.connect(dbUrl, (err, client) => {
  assert.equal(null, err)
  console.log('Connected successfully to server')

  const db = client.db(dbName)
  const col = db.collection(collectionName)

  // Timer for every 15 seconds
  schedule.scheduleJob('0,15,30,45 * * * * *', () => {
    // URL of bitcoin ticker API
    let url = 'https://blockchain.info/ticker'
    // Get ticker by HTTP GET request
    axios.get(url)
      .then(originData => {
        // originData.data: Data from ticker
        // formatedData: Data to save in database
        let formatedData = reformatData(originData.data)
        console.log(formatedData)
        col.insert(formatedData, () => {
          console.log('Insert successful at', Date())
        })
      })
      .catch(error => {
        console.log(error)
      })
  })
})

// Reformat data
function reformatData (originData) {
  let currentDateTime = new Date()
  let datetime = reformatDateTime(currentDateTime)
  let formatedData = []
  for (let currency in originData) {
    let pair = 'bit_' + currency.toLowerCase()
    let price = originData[currency]['last']
    let exchange = currency.toLowerCase()
    let record = {
      'datetime': datetime,
      'pair': pair,
      'price': price,
      'exchange': exchange
    }
    formatedData.push(record)
  }
  return formatedData
}
// Reformat date time
function reformatDateTime (currentDateTime) {
  let datetime = ''
  datetime += currentDateTime.getFullYear()
  datetime += '-'
  datetime += _.padStart((currentDateTime.getMonth() + 1), 2, '0')
  datetime += '-'
  datetime += _.padStart(currentDateTime.getDate(), 2, '0')
  datetime += ' '
  datetime += _.padStart(currentDateTime.getHours(), 2, '0')
  datetime += ':'
  datetime += _.padStart(currentDateTime.getMinutes(), 2, '0')
  datetime += ':'
  datetime += _.padStart(currentDateTime.getSeconds(), 2, '0')
  return datetime
}
