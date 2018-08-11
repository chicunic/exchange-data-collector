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
    getData()
      .then(originData => {
        // originData: Data from ticker
        // formatedData: Data to save in database
        let formatedData = reformatData(originData)
        col.insert(formatedData, () => {
          console.log('Insert successful at', Date())
        })
      })
  })
})

// Get data from ticker
function getData () {
  // URL of bitcoin ticker API
  let url = 'https://blockchain.info/ticker'
  let currentData
  // Get ticker by HTTP GET request
  return axios.get(url)
    .then(response => {
      currentData = response.data
    })
    .catch(error => {
      console.log(error)
    }).then(() => {
      return currentData
    })
}
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
  datetime += convertNumberToString(currentDateTime.getMonth() + 1)
  datetime += '-'
  datetime += convertNumberToString(currentDateTime.getDate())
  datetime += ' '
  datetime += convertNumberToString(currentDateTime.getHours())
  datetime += ':'
  datetime += convertNumberToString(currentDateTime.getMinutes())
  datetime += ':'
  datetime += convertNumberToString(currentDateTime.getSeconds())
  return datetime
}
// Convert to double digits
function convertNumberToString (originNumber) {
  if (originNumber < 10) {
    return '0' + originNumber.toString()
  } else {
    return originNumber.toString()
  }
}
