module.exports = {
  api: async (ctx, exchange) => {
    // database name
    const db = 'exchange'
    // colletcion Name
    const col = 'bitcoin'
    // get current datetime
    let currentDateTime = new Date()
    let datetime = reformatDateTime(currentDateTime)
    // list all exchanges
    let exchanges = ['usd', 'jpy', 'cny', 'sgd', 'hkd', 'cad', 'nzd', 'aud', 'clp', 'gbp', 'dkk',
      'sek', 'isk', 'chf', 'brl', 'eur', 'rub', 'pln', 'thb', 'krw', 'twd']
    // store calculated data
    let differData = []
    // calculate the differ bewteen max and min for each exchange
    for (let exchange of exchanges) {
      // originData: data from database
      let originData = await ctx.mongo.db(db).collection(col).find({ 'exchange': exchange }).toArray()
      let maxPrice = Math.max.apply(Math, originData.map(obj => { return obj.price }))
      let minPrice = Math.min.apply(Math, originData.map(obj => { return obj.price }))
      let pair = 'bit_' + exchange
      let priceBetweenMaxMin = maxPrice - minPrice
      differData.push({ 'datetime': datetime, 'pair': pair, 'price_between_max_min': priceBetweenMaxMin })
    }
    return differData
  }
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
