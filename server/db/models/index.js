const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const ProductOrder = require('./product-order')

Order.belongsTo(User)

Order.belongsToMany(Product, {through: ProductOrder})
Product.belongsToMany(Order, {through: ProductOrder})

// Order.hasMany(ProductOrder)
// ProductOrder.belongsTo(Order)
// Product.hasMany(ProductOrder)
// ProductOrder.belongsTo(Product)

module.exports = {
  User,
  Order,
  Product,
  ProductOrder
}
