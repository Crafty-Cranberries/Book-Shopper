const User = require('./user')
const Book = require('./book')
const Order = require('./order')
const OrderHistory = require('./orderHistory')
const Author = require('./author')
const BookOrder = require('./bookOrder')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasOne(Order)
Order.belongsTo(User)

User.hasMany(OrderHistory)
OrderHistory.belongsTo(User)

Book.belongsTo(Author)
Author.hasMany(Book)

Book.belongsToMany(Order, {through: 'BookOrder'})
Order.belongsToMany(Book, {through: 'BookOrder'})
//Book.belongsToMany(Order, {through: 'BookOrder'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Book,
  Order,
  OrderHistory,
  Author,
  BookOrder
}
