const User = require('./user')
const Order = require('./order')
const Product = require('./product')

Order.belongsTo(User)

module.exports = {
  User,
  Order,
  Product
}
